import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not get posts",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not create post",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post does not exist",
      });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not get one post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post does not exist",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not delete post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.body.userId,
        tags: req.body.tags,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could update post",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts.map(obj => obj.tags).flat().slice(0, 5);

    res.json(tags);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'could not find Tags'
    })
  }
}
