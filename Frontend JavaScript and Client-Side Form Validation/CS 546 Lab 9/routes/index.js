//Here you will require route files and export them as used in previous labs.
import fibonacci_primeRoutes from "./fibonacci_prime.js";

const constructorMethod = (app) => {
    app.use("/", fibonacci_primeRoutes);

    app.use("*", (req, res) => {
        res.redirect("/");
    });
}

export default constructorMethod;
