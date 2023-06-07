// app.js
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const gender = document.getElementById('registerGender').value;
    const phone = document.getElementById('registerPhone').value;
    
    if (localStorage.getItem(username)) {
        alert('Username already exists.');
        return;
    }

    const user = {
        username: username,
        password: password,
        gender: gender,
        phone: phone,
        role: 'normal user'
    };
    
    localStorage.setItem(username, JSON.stringify(user));

    const totalUsers = Object.keys(localStorage).length - 1;  // Subtract 1 to account for the 'currentUser' item
    alert('Registration successful. Total users: ' + totalUsers);
}


function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem(username));
    
    if (storedUser && storedUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        window.location.href = 'user.html';
    } else {
        alert('Login failed.');
    }
}


function showUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        const userInfo = {...currentUser}; 
        delete userInfo.password; 
        alert(JSON.stringify(userInfo, null, 2));
    } else {
        alert('User not found.');
    }
}


function deleteAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        if (confirm('Are you sure you want to delete your account?')) {
            localStorage.removeItem(currentUser.username);
            localStorage.removeItem('currentUser');
            alert('Account deleted successfully.');
            window.location.href = 'index.html';
        }
    } else {
        alert('Unable to delete account.');
    }
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
function updateUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser.username;

    const gender = document.getElementById('updateGender').value;
    const phone = document.getElementById('updatePhone').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    // Check if the current password is correct
    if (currentPassword === currentUser.password) {
        const updatedUser = {
            username: username,
            password: newPassword,
            gender: gender,
            phone: phone,
            role: 'normal user'
        };
        
        // Save the updated user object to localStorage
        localStorage.setItem(username, JSON.stringify(updatedUser));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        alert('User info updated successfully.');
        window.location.href = 'user.html';
    } else {
        alert('Current password is incorrect.');
    }
}


