import ApiError from '@/errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import User from '../user/model';
import { INotification } from './interface';
import Notification from './model';

const createNotification = async (payload: INotification) => {
  await Notification.create(payload);
};

const readAllNotifications = async (authUser: JwtPayload | null) => {
  if (!authUser)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User credentials is missing');

  const user = await User.getRoleSpecificDetails(authUser.userId);

  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "User account doesn't exist");

  const data = await Notification.updateMany(
    { 'to._id': user._id },
    { isRead: true },
    { new: true }
  );

  return data;
};

const getAllNotifications = async (authUser: JwtPayload | null) => {
  if (!authUser)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User credentials is missing');

  const user = await User.getRoleSpecificDetails(authUser.userId);

  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "User account doesn't exist");

  const data = await Notification.find({ 'to._id': user._id }).sort({
    createdAt: -1,
  });
  return data;
};

const deleteAllNotifications = async (authUser: JwtPayload | null) => {
  if (!authUser)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User credentials is missing');

  const user = await User.getRoleSpecificDetails(authUser.userId);

  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "User account doesn't exist");

  const data = await Notification.deleteMany({ 'to._id': user._id });
  return data;
};

const deleteNotification = async (id: string, authUser: JwtPayload | null) => {
  if (!authUser)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User credentials is missing');

  const user = await User.getRoleSpecificDetails(authUser.userId);

  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "User account doesn't exist");

  const data = await Notification.findOne({ _id: id, 'to._id': user._id });
  return data;
};

export const NotificationServices = {
  createNotification,
  readAllNotifications,
  getAllNotifications,
  deleteAllNotifications,
  deleteNotification,
};
