import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { contentModel, userModel, linksModel } from "./db";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { randomBytes } from "crypto";
import { random } from "./utils";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req,res) => {
    try{
    const requiredBody = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(6, "Password is too short").max(12, "Password is too long")
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success){
        res.json({
            message: (parsedBody.error.errors)
        });
    }

    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    const registerResponse = await userModel.create({
        username,
        password: hashedPassword
    });

    if(!registerResponse){
        res.json({
            message: "There was an error while registering"
        });
    }else{
        res.json({
            message: "You registerd successfully"
        });
    }
}catch(e){
    res.json({
        message: "There was an error"
    });
}
});

app.post("/api/v1/signin", async (req,res) => {
    try{
        const {username, password} = req.body;

        const user = await userModel.findOne({
            username
        });
        if(!user){
            res.json({
                message: "User does not exist"
            });
        }else{
            const passwordMatch = await bcrypt.compare(password, user.password)

            if(passwordMatch){
                const token = jwt.sign({
                    id: user._id
                }, JWT_SECRET);
                res.json({
                    message: "Signed in successfully",
                    token
                });
            }else{
                res.json({
                    message: "Incorrect credentials"
                });
            }
        }
    }catch(e){
        res.json({
            message: "There was an error"
        });
    }
});

app.post("/api/v1/content",userMiddleware, async (req,res) => {
    try{
    const { link, type, title } = req.body;

    await contentModel.create({
        link,
        type,
        title,
        userId: req.userId
    });

    res.json({
        message: "Content created"
    });
}catch(e){
    res.json({
        message: 'There was an error while creating the content'
    });
}
});

app.get("/api/v1/content", userMiddleware, async (req,res) => {
    try{
    const id = req.userId;
    const availableContent = await contentModel.findOne({
        userId: id
    }).populate("userId", "username");

    res.json({
        availableContent
    });
}catch(e){
    res.json({
        message: "There occured an error while fetching an error"
    });
}
});

app.delete("/api/v1/content", userMiddleware, async (req,res) => {
    try{
    const contentId = req.body.contentId;
    const userId = req.userId;

    const deletion = await contentModel.deleteOne({
        contentId,
        userId
    });
    if(deletion){
        res.json({
            message: "Deleted the content"
        });
    }else{
        res.json({
            message: "Content does not exist"
        });
    }
}catch(e){
    res.json({
        message: "There was an error while deleting the content"
    });
}
});

app.post("/api/v1/brain/share", userMiddleware, async (req,res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await linksModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            // const hash = randomBytes(10).toString('hex'); CAN USE THIS AS WELL
            await linksModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await linksModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
});

app.get("/api/v1/brain/:shareLink", userMiddleware, async (req,res) => {
    const hash = req.params.shareLink;

    const link = await linksModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return
    }

    const content = await contentModel.find({
        userId: link.userId
    }).populate("userId", "username");

    res.json({
        content
    })
});


function main(){
    mongoose.connect("")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

    app.listen(3000, () => {
        console.log("Server is running on 3000");
    });
}

main();