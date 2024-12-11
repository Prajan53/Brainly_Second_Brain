"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linksModel = exports.tagsModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio'];
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: ObjectId, ref: 'Tags' }],
    userId: { type: ObjectId, ref: 'users', required: true, validate: function (value) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield exports.userModel.findById(value);
                if (!user) {
                    throw new Error('User does not exist');
                }
            });
        }
    }
});
const TagsSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true }
});
const LinksSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'users', required: true, unique: true }
});
exports.userModel = (0, mongoose_1.model)("users", UserSchema);
exports.contentModel = (0, mongoose_1.model)("content", ContentSchema);
exports.tagsModel = (0, mongoose_1.model)("tags", TagsSchema);
exports.linksModel = (0, mongoose_1.model)("links", LinksSchema);
