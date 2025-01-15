//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const exportedMethods = {
    checkName(name){
        if(!name) throw "Error: You must provide a name";
        if(typeof name !== "string") throw "Error: Name must be a string";
        name = name.trim();
        if(name.length === 0) throw "Error: Name cannot be an empty string or just spaces";
        if(name.length < 2 || name.length > 25) throw "Error: Name must be between 2 and 25 characters long";
        if(/\d/.test(name)) throw "Error: Name should not contain numbers";
        if(/[!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?~]/.test(name)) throw "Error: Name should not contain special characters"; 
        return name;
    },

    checkUserId(userId){
        if(!userId) throw "Error: You must provide a userId";
        if(typeof userId !== "string") throw "Error: userId must be a string";
        userId = userId.trim();
        if(userId.length === 0) throw "Error: userId cannot be an empty string or just spaces";
        if(userId.length < 5 || userId.length > 10) throw "Error: userId must be between 5 and 10 characters long";
        if(/\d/.test(userId)) throw "Error: userId should not contain numbers"; // I referenced this website for the regex to check if string contains number https://blog.devgenius.io/javascript-check-if-string-contains-numbers-21351004c9a3
        if(/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(userId)) throw "Error: userId should not contain special characters";
        userId = userId.toLowerCase();
        return userId;
    },

    checkPassword(password){
        if(!password) throw "Error: You must provide a password";
        if(typeof password !== "string") throw "Error: password must be a string";
        password = password.trim();
        if(password.length === 0) throw "Error: password cannot be an empty string or just spaces";
        if(password.length < 8) throw "Error: password must be at least 8 characters long";
        if(!/[A-Z]/.test(password)) throw "Error: password must contain at least one uppercase character"; // I referenced this website for the regex to check if string contains uppercase character https://plainenglish.io/blog/javascript-check-if-string-contains-uppercase-letters-9a78b69739f6
        if(!/\d/.test(password)) throw "Error: password must contain at least one number";
        if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) throw "Error: password must contain at least one special character"; // I referenced this website for the regex to check if string contains special character https://javascript.plainenglish.io/javascript-check-if-string-contains-special-characters-8e9e1f1e74bd
        return password;
    },

    checkFavoriteQuote(favoriteQuote){
        if(!favoriteQuote) throw "Error: You must provide a favorite quote";
        if(typeof favoriteQuote !== "string") throw "Error: Favorite quote must be a string";
        favoriteQuote = favoriteQuote.trim();
        if(favoriteQuote.length === 0) throw "Error: Favorite quote cannot be an empty string or just spaces";
        if(favoriteQuote.length < 20 || favoriteQuote.length > 255) throw "Error: Favorite quote must be between 20 and 255 characters long";
        return favoriteQuote;
    },

    checkThemePreference(themePreference){
        if(typeof themePreference !== "object") throw "Error: Theme preference must be an object";
        const validKeys = ["backgroundColor", "fontColor"];
        const keys = Object.keys(themePreference);
        if(keys.length !== 2) throw "Error: Theme preference must contain only two properties";
        for(let key of keys){
            if(!validKeys.includes(key)) throw "Error: Theme preference must include keys backgroundColor and fontColor";
        }
        const validHexColors = ["#ffffff", "#000000"];
        if(!validHexColors.includes(themePreference.backgroundColor.toLowerCase()) || !validHexColors.includes(themePreference.fontColor.toLowerCase())) throw "Error: backgroundColor and fontColor must be valid hex colors";
        if(themePreference.backgroundColor.toLowerCase() === "#ffffff" && themePreference.fontColor.toLowerCase() === "#ffffff") throw "Error: backgroundColor and fontColor cannot both be #ffffff";
        if(themePreference.backgroundColor.toLowerCase() === "#000000" && themePreference.fontColor.toLowerCase() === "#000000") throw "Error: backgroundColor and fontColor cannot both be #000000";
        return themePreference;
    }
};

export default exportedMethods;
