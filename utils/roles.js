const fs = require('fs');
const path = require('path');

const rolesFilePath = path.resolve(__dirname, '../config/roles.json');

function getRoles () {
  
    const rolesData = fs.readFileSync(rolesFilePath, 'utf-8');
    const roles = JSON.parse(rolesData).roles;
    return roles;
}

function getPermissionsForRole(roleName) {
    const roles = getRoles();
    const role = roles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
}



module.exports = { getRoles, getPermissionsForRole };