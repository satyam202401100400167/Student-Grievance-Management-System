import Grievance from "../models/Grievance.js";

export const createGrievance = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description and category are required" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      userId: req.user._id
    });

    return res.status(201).json(grievance);
  } catch (error) {
    next(error);
  }
};

export const getAllGrievances = async (req, res, next) => {
  try {
    const grievances = await Grievance.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json(grievances);
  } catch (error) {
    next(error);
  }
};

export const getGrievanceById = async (req, res, next) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    return res.json(grievance);
  } catch (error) {
    next(error);
  }
};

export const updateGrievance = async (req, res, next) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { title, description, category, status } = req.body;

    grievance.title = title ?? grievance.title;
    grievance.description = description ?? grievance.description;
    grievance.category = category ?? grievance.category;
    grievance.status = status ?? grievance.status;

    const updatedGrievance = await grievance.save();
    return res.json(updatedGrievance);
  } catch (error) {
    next(error);
  }
};

export const deleteGrievance = async (req, res, next) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await grievance.deleteOne();
    return res.json({ message: "Grievance deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const searchGrievances = async (req, res, next) => {
  try {
    const { title } = req.query;
    const query = {
      userId: req.user._id
    };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const grievances = await Grievance.find(query).sort({ createdAt: -1 });
    return res.json(grievances);
  } catch (error) {
    next(error);
  }
};
