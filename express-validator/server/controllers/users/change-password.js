import db from "../../config/db/users-db.js";
import bcrypt from "bcrypt";

import responses from "../../utils/show-response.js";

const modifyPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.params.id;

  const passwordIsValid = await validatePassword(req, res, userId, oldPassword, newPassword);

  if (passwordIsValid) {
    const passwordChanged = await updatePassword(req, res, userId, newPassword);
    if (passwordChanged) {
      return responses.success(res, "Password updated successfully", userId);
    }
  }
};

async function validatePassword(req, res, userId, oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    return responses.badRequest(res, "Please fill in all required fields");
  }

  if (!/^.{8,}$/.test(newPassword)) {
    return responses.badRequest(res, "New password must be at least 8 characters long");
  }
  if (!/^(?=.*[A-Z]).+$/.test(newPassword)) {
    return responses.badRequest(res, "New password must contain an uppercase letter");
  }
  if (!/^\S+$/.test(newPassword)) {
    return responses.badRequest(res, "New password cannot contain whitespace");
  }

  return new Promise((resolve) => {
    db.get(`SELECT password FROM users WHERE id = ?`, userId, async (err, user) => {
      if (err) {
        responses.serverError(res);
        return resolve(false);
      }

      if (!user) {
        responses.notFound(res, "User not found");
        return resolve(false);
      }

      bcrypt.compare(oldPassword, user.password, (err, match) => {
        if (err) {
          responses.serverError(res);
          return resolve(false);
        }

        if (!match) {
          responses.unauthorized(res, "Old password does not match");
          return resolve(false);
        }

        if (oldPassword === newPassword) {
          responses.conflict(res, "New password cannot be the same as old password");
          return resolve(false);
        }

        resolve(true);
      });
    });
  });
}

async function updatePassword(req, res, userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, userId],
      (err) => {
        if (err) {
          responses.serverError(res);
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
}

export default modifyPassword;
