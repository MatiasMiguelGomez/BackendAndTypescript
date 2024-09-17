import { NextFunction, Request, Response } from 'express';
import { Category } from '../types/productTypes';

const checkField = (
  nameField: string,
  valueField: unknown,
  expectedType: string
): string | null => {
  if (typeof valueField !== expectedType) {
    return `the field ${nameField} is incorrect. Please write the param in ${expectedType}`;
  }
  return null;
};

const checkCategory = (category: string): string | null => {
  if (!Object.values(Category).includes(category as Category)) {
    return `the field category is incorrect. Please write an available category: ${Object.values(
      Category
    )}`;
  }
  return null;
};

const productValidator = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, stock, price, category } = req.body;
  const errors: Array<string> = [];
  const missings: Array<string> = [];
  if (!title) {
    missings.push('Missing title');
  } else {
    const error = checkField('title', title, 'string');
    if (error) errors.push(error);
  }
  if (!description) {
    missings.push('Missing description');
  } else {
    const error = checkField('description', description, 'string');
    if (error) errors.push(error);
  }
  if (!stock) {
    missings.push('Missing stock');
  } else {
    const error = checkField('stock', stock, 'number');
    if (error) errors.push(error);
  }
  if (!price) {
    missings.push('Missing price');
  } else {
    const error = checkField('price', price, 'number');
    if (error) errors.push(error);
  }
  if (!category) {
    missings.push('Missing category');
  } else {
    const error = checkCategory(category);
    if (error) errors.push(error);
  }
  if (missings.length > 0) {
    return res.status(400).json({ status: 'error', payload: missings });
  }
  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', payload: errors });
  }
  return next();
};

const queriesValidator = (req: Request, res: Response, next: NextFunction) => {
  const { sort, category, price } = req.query;

  if (sort !== undefined && typeof sort !== 'string') {
    return res
      .status(400)
      .json({ error: 'you can only enter a single parameter sort (asc, desc)' });
  }

  if (typeof sort === 'string' && sort !== 'asc' && sort !== 'desc') {
    return res.status(400).json({ error: `Incorrect sort "${sort}". Please enter asc or desc.` });
  }

  if (price !== undefined && typeof price !== 'string') {
    return res
      .status(400)
      .json({ error: 'you can only enter a single parameter price (cheaper, expensive)' });
  }
  if (typeof price === 'string' && price !== 'cheaper' && price !== 'expensive') {
    return res.status(400).json({ error: `Incorrect price "${price}" (cheaper, expensive)` });
  }

  if (category !== undefined && typeof category !== 'string') {
    return res.status(400).json({
      error: `you can only enter a single parameter category (${Object.values(Category)})`,
    });
  }
  if (typeof category === 'string') {
    const error = checkCategory(category);
    if (error) {
      return res
        .status(400)
        .json({ error: `incorrect category, please enter ${Object.values(Category)}` });
    }
  }
  return next();
};

const updatesValidator = (req: Request, res: Response, next: NextFunction): void | Response => {
  const { ...updates } = req.body;
  const errors: Array<string> = [];
  if (updates.title) {
    const error = checkField('title', updates.title, 'string');
    if (error) errors.push(error);
  }
  if (updates.description) {
    const error = checkField('description', updates.description, 'string');
    if (error) errors.push(error);
  }
  if (updates.stock) {
    const error = checkField('stock', updates.stock, 'number');
    if (error) errors.push(error);
  }
  if (updates.price) {
    const error = checkField('price', updates.price, 'number');
    if (error) errors.push(error);
  }
  if (updates.code) {
    const error = checkField('code', updates.code, 'string');
    if (error) errors.push(error);
  }
  if (updates.category) {
    const error = checkCategory(updates.category);
    if (error) errors.push(error);
  }
  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', payload: errors });
  }
  return next();
};

export default { updatesValidator, productValidator, queriesValidator };
