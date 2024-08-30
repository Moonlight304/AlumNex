import { atom } from 'recoil';
import { jwtDecode } from 'jwt-decode';

function getDecodedTokenField(field) {
    try {
        const jwt_token = sessionStorage.getItem('jwt_token');
        if (!jwt_token) return null;
        const decodedObj = jwtDecode(jwt_token);
        return decodedObj[field];
    } catch (e) {
        return null;
    }
}

export const usernameState = atom({
    key: 'usernameState',
    default: getDecodedTokenField('username') || 'NOT_FOUND',
});

export const userIDState = atom({
    key: 'userIDState',
    default: getDecodedTokenField('userID') || 'NOT_FOUND',
});

export const userTypeState = atom({
    key: 'userTypeState',
    default: getDecodedTokenField('userType') || 'NOT_FOUND',
});
