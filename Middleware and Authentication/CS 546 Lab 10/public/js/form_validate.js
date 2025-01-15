// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
$("#signup-form").submit((event) => {
    $(".error").remove();
    let hasError = false;
    const firstName = $("#firstName").val();
    const firstNameError = checkName(firstName);
    if(firstNameError){
        $("#firstName").after(`<p class="error">${firstNameError}</p>`);
        hasError = true;
    }
    const lastName = $("#lastName").val();
    const lastNameError = checkName(lastName);
    if(lastNameError){
        $("#lastName").after(`<p class="error">${lastNameError}</p>`);
        hasError = true;
    }
    const userId = $("#userId").val();
    const userIdError = checkUserId(userId);
    if(userIdError){
        $("#userId").after(`<p class="error">${userIdError}</p>`);
        hasError = true;
    }
    const password = $("#password").val();
    const passwordError = checkPassword(password);
    if(passwordError){
        $("#password").after(`<p class="error">${passwordError}</p>`);
        hasError = true;
    }
    const confirmPassword = $("#confirmPassword").val();
    if(password !== confirmPassword){
        $("#confirmPassword").after(`<p class="error">Password and confirm password do not match</p>`);
        hasError = true;
    }
    const favoriteQuote = $("#favoriteQuote").val();
    const favoriteQuoteError = checkFavoriteQuote(favoriteQuote);
    if(favoriteQuoteError){
        $("#favoriteQuote").after(`<p class="error">${favoriteQuoteError}</p>`);
        hasError = true;
    }
    const backgroundColor = $("#backgroundColor").val();
    const fontColor = $("#fontColor").val();
    const themePreference = {backgroundColor: backgroundColor, fontColor: fontColor};
    const themePreferenceError = checkThemePreference(themePreference);
    if(themePreferenceError){
        $("#fontColor").after(`<p class="error">${themePreferenceError}</p>`);
        hasError = true;
    }
    const role = $("#role").val();
    const roleError = checkRole(role);
    if(roleError){
        $("#role").after(`<p class="error">${roleError}</p>`);
        hasError = true;
    }
    if(hasError){
        event.preventDefault();
    }
});

$("#signin-form").submit((event) => {
    $(".error").remove();
    let hasError = false;
    const userId = $("#userId").val();
    const userIdError = checkUserId(userId);
    if(userIdError){
        $("#userId").after(`<p class="error">${userIdError}</p>`);
        hasError = true;
    }
    const password = $("#password").val();
    const passwordError = checkPassword(password);
    if(passwordError){
        $("#password").after(`<p class="error">${passwordError}</p>`);
        hasError = true;
    }
    if(hasError){
        event.preventDefault();
    }
});

const checkName = (name) => {
    if(!name) return "Error: You must provide a name";
    if(typeof name !== "string") return "Error: Name must be a string";
    name = name.trim();
    if(name.length === 0) return "Error: Name cannot be an empty string or just spaces";
    if(name.length < 2 || name.length > 25) return "Error: Name must be between 2 and 25 characters long";
    if(/\d/.test(name)) return "Error: Name should not contain numbers";
    if(/[!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?~]/.test(name)) return "Error: Name should not contain special characters"; 
    return null;
}

const checkUserId = (userId) =>{
    if(!userId) return "Error: You must provide a userId";
    if(typeof userId !== "string") return "Error: userId must be a string";
    userId = userId.trim();
    if(userId.length === 0) return "Error: userId cannot be an empty string or just spaces";
    if(userId.length < 5 || userId.length > 10) return "Error: userId must be between 5 and 10 characters long";
    if(/\d/.test(userId)) return "Error: userId should not contain numbers"; // I referenced this website for the regex to check if string contains number https://blog.devgenius.io/javascript-check-if-string-contains-numbers-21351004c9a3
    if(/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(userId)) return "Error: userId should not contain special characters";
    userId = userId.toLowerCase();
    return null;
}

const checkPassword = (password) => {
    if(!password) return "Error: You must provide a password";
    if(typeof password !== "string") return "Error: password must be a string";
    password = password.trim();
    if(password.length === 0) return "Error: password cannot be an empty string or just spaces";
    if(password.length < 8) return "Error: password must be at least 8 characters long";
    if(!/[A-Z]/.test(password)) return "Error: password must contain at least one uppercase character"; // I referenced this website for the regex to check if string contains uppercase character https://plainenglish.io/blog/javascript-check-if-string-contains-uppercase-letters-9a78b69739f6
    if(!/\d/.test(password)) return "Error: password must contain at least one number";
    if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) return "Error: password must contain at least one special character"; // I referenced this website for the regex to check if string contains special character https://javascript.plainenglish.io/javascript-check-if-string-contains-special-characters-8e9e1f1e74bd
    return null;
}

const checkFavoriteQuote = (favoriteQuote) => {
    if(!favoriteQuote) return "Error: You must provide a favorite quote";
    if(typeof favoriteQuote !== "string") return "Error: Favorite quote must be a string";
    favoriteQuote = favoriteQuote.trim();
    if(favoriteQuote.length === 0) return "Error: Favorite quote cannot be an empty string or just spaces";
    if(favoriteQuote.length < 20 || favoriteQuote.length > 255) return "Error: Favorite quote must be between 20 and 255 characters long";
    return null;
}

const checkThemePreference = (themePreference) => {
    if(typeof themePreference !== "object") return "Error: Theme preference must be an object";
    const validKeys = ["backgroundColor", "fontColor"];
    const keys = Object.keys(themePreference);
    if(keys.length !== 2) return "Error: Theme preference must contain only two properties";
    for(let key of keys){
        if(!validKeys.includes(key)) return "Error: Theme preference must include keys backgroundColor and fontColor";
    }
    const validHexColors = ["#ffffff", "#000000"];
    if(!validHexColors.includes(themePreference.backgroundColor.toLowerCase()) || !validHexColors.includes(themePreference.fontColor.toLowerCase())) return "Error: backgroundColor and fontColor must be valid hex colors";
    if(themePreference.backgroundColor.toLowerCase() === "#ffffff" && themePreference.fontColor.toLowerCase() === "#ffffff") return "Error: backgroundColor and fontColor cannot both be #ffffff";
    if(themePreference.backgroundColor.toLowerCase() === "#000000" && themePreference.fontColor.toLowerCase() === "#000000") return "Error: backgroundColor and fontColor cannot both be #000000";
    return null;
}

const checkRole = (role) => {
    role = role.trim().toLowerCase();
    if(role !== "admin" && role !== "user") return "Error: The only two valid roles are admin and user";
    return null;
}
