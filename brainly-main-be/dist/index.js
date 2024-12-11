"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredBody = zod_1.z.object({
            username: zod_1.z.string().min(1, "Username is required"),
            password: zod_1.z.string().min(6, "Password is too short").max(12, "Password is too long")
        });
        const parsedBody = requiredBody.safeParse(req.body);
        if (!parsedBody.success) {
            res.json({
                message: (parsedBody.error.errors)
            });
        }
        const { username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const registerResponse = yield db_1.userModel.create({
            username,
            password: hashedPassword
        });
        if (!registerResponse) {
            res.json({
                message: "There was an error while registering"
            });
        }
        else {
            res.json({
                message: "You registerd successfully"
            });
        }
    }
    catch (e) {
        res.json({
            message: "There was an error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield db_1.userModel.findOne({
            username
        });
        if (!user) {
            res.json({
                message: "User does not exist"
            });
        }
        else {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (passwordMatch) {
                const token = jsonwebtoken_1.default.sign({
                    id: user._id
                }, config_1.JWT_SECRET);
                res.json({
                    message: "Signed in successfully",
                    token
                });
            }
            else {
                res.json({
                    message: "Incorrect credentials"
                });
            }
        }
    }
    catch (e) {
        res.json({
            message: "There was an error"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title } = req.body;
        yield db_1.contentModel.create({
            link,
            type,
            title,
            userId: req.userId
        });
        res.json({
            message: "Content created"
        });
    }
    catch (e) {
        res.json({
            message: 'There was an error while creating the content'
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const availableContent = yield db_1.contentModel.findOne({
            userId: id
        }).populate("userId", "username");
        res.json({
            availableContent
        });
    }
    catch (e) {
        res.json({
            message: "There occured an error while fetching an error"
        });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        const userId = req.userId;
        const deletion = yield db_1.contentModel.deleteOne({
            contentId,
            userId
        });
        if (deletion) {
            res.json({
                message: "Deleted the content"
            });
        }
        else {
            res.json({
                message: "Content does not exist"
            });
        }
    }
    catch (e) {
        res.json({
            message: "There was an error while deleting the content"
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linksModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        // const hash = randomBytes(10).toString('hex'); CAN USE THIS AS WELL
        yield db_1.linksModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linksModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linksModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
function main() {
    mongoose_1.default.connect("")
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB", err));
    app.listen(3000, () => {
        console.log("Server is running on 3000");
    });
}
main();
