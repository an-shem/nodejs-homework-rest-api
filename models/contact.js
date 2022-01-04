const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phoneRegex = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaAdd = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phoneRegex).required(),
  favorite: Joi.boolean(),
});

const joiSchemaUpdate = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().regex(phoneRegex).optional(),
}).or('name', 'email', 'phone');

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchemaAdd,
  joiSchemaUpdate,
  favoriteJoiSchema,
};
