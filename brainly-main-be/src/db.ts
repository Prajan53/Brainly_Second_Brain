import mongoose, { model, Schema } from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio'];

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const ContentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: ObjectId, ref:'Tags'}],
    userId: {type: ObjectId, ref:'users', required: true, validate: async function(value: string) {
        const user = await userModel.findById(value);
        if (!user) {
          throw new Error('User does not exist');
        }
      }
    }
});

const TagsSchema = new Schema({
    title: {type: String, required: true, unique: true}
});

const LinksSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: ObjectId, ref: 'users', required: true, unique: true}
});

export const userModel = model("users", UserSchema);
export const contentModel = model("content", ContentSchema);
export const tagsModel = model("tags", TagsSchema);
export const linksModel = model("links", LinksSchema);