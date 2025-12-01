/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

/**
 * Creates a new user with a specified role.
 * This function can only be called by an authenticated user who is an admin.
 */
exports.createUser = onCall(async (request) => {
    // --- SECURITY CHECK ---
    // For now, we'll leave this commented out so we can create the first admin user.
    // After the first admin is created, we will uncomment this block.
    /*
    if (request.auth?.token?.role !== "admin") {
        throw new HttpsError(
            "permission-denied",
            "This function can only be called by an admin."
        );
    }
    */

    const { email, password, role } = request.data;

    // Validate input
    if (!email || !password || !role) {
        throw new HttpsError(
            "invalid-argument",
            "The function must be called with 'email', 'password', and 'role' arguments."
        );
    }

    const validRoles = ["admin", "tecnico"];
    if (!validRoles.includes(role)) {
        throw new HttpsError(
            "invalid-argument",
            `'${role}' is not a valid role. Must be one of: ${validRoles.join(", ")}`
        );
    }

    try {
        logger.info(`Attempting to create user: ${email} with role: ${role}`);

        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
        });

        // Set role using custom claims. This is the secure way to manage roles.
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: role });

        // We also save user data to a 'users' collection in Firestore.
        // This is useful for easily querying users by role on the client-side.
        await admin.firestore().collection("users").doc(userRecord.uid).set({
            email: email,
            role: role,
        });

        logger.info(`Successfully created user ${userRecord.uid} (${email})`);
        return {
            status: "success",
            message: `Successfully created user ${email} with role ${role}.`,
            uid: userRecord.uid,
        };
    } catch (error) {
        logger.error("Error creating new user:", error);
        if (error.code === 'auth/email-already-exists') {
            throw new HttpsError("already-exists", "A user with this email already exists.");
        }
        throw new HttpsError("internal", "An unexpected error occurred while creating the user.");
    }
});