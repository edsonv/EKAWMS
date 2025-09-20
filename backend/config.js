"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    jwtSecret: process.env.JWT_SECRET || "My_Secret_Key",
    port: process.env.PORT || 4000,
};
exports.default = exports.config;
//# sourceMappingURL=config.js.map