/* fileName: index.js
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
  if (req.user) {
    let user = req.user;
    return user.displayName.toString();
  }
  return "";
}
exports.UserDisplayName = UserDisplayName;
function AuthGuard(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
exports.AuthGuard = AuthGuard;
