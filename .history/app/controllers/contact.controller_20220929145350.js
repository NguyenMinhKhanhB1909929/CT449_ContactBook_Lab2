const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = (req, res) => {
  res.send({ message: "create handler" });
};

exports.findAll = async (req, res, next) => {
  // let documents = [];

  // try {
  //   const ContactService = new ContactService(MongoDB.client);
  //   const { name } = req.query;
  //   if (name) {
  //     documents = await contactService.findByName(name);
  //   } else {
  //     documents = await contactService.find({});
  //   }
  // } catch (error) {
  //   return next(
  //     new ApiError(500, "An error occurred while retrieving contacts")
  //   );
  // }

  // return res.send(documents);
  res.send({ message: "findAll" });
};

exports.findOne = async (req, res, next) => {
  try {
    const ContactService = new ContactService(MongoDB.client);
    const document = await ContactService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404), "Contact not found");
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
};

exports.update = (req, res) => {
  res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
  res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
  res.send({ message: "findAllFavorite handler" });
};

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const ContactService = new ContactService(MongoDB.client);
    const document = await ContactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};
