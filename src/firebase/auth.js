import MOCK_USERS from "../mockdata/users.js";

// Simulación de usuario autenticado en localStorage
let currentUser = null;

// Verificar si hay usuario guardado al cargar el módulo
const savedUser = localStorage.getItem("currentUser");
if (savedUser) {
    currentUser = JSON.parse(savedUser);
}

// Wrappers para la UI: manejan la autenticación con mockdata
export const subscribeToAuthChanges = (callback) => {
    // Simula cambios de autenticación
    callback(currentUser);
    
    // Retorna una función para "desuscribirse"
    return () => {};
};

export const logoutUser = async () => {
    try {
        currentUser = null;
        localStorage.removeItem("currentUser");
        return { success: true };
    } catch (error) {
        console.error("Error logging out:", error);
        return { success: false, error: error.message };
    }
};

export const registerFullUser = async (userData) => {
    try {
        // Simula una demora de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verificar si el email ya existe
        const existingUser = MOCK_USERS.find(u => u.email === userData.email);
        if (existingUser) {
            return { success: false, error: "auth/email-already-in-use" };
        }

        // Crear nuevo usuario simulado
        const newUser = {
            id: Math.max(...MOCK_USERS.map(u => u.id)) + 1,
            name: userData.name,
            email: userData.email,
            cellphone: userData.cellphone,
            address: userData.address,
            password: userData.password
        };

        // Simular guardado (en una app real, esto iría a una BD)
        MOCK_USERS.push(newUser);

        // Establecer como usuario actual
        currentUser = { id: newUser.id, email: newUser.email, name: newUser.name };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        return { success: true, user: currentUser };
    } catch (error) {
        console.error("Error en el servicio de registro:", error);
        return { success: false, error: error.message };
    }
};

export const loginUser = async (email, password) => {
    try {
        // Simula una demora de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, error: "Correo o contraseña incorrectos" };
        }

        // Establecer como usuario actual
        currentUser = { id: user.id, email: user.email, name: user.name };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        return { success: true, user: currentUser };
    } catch (error) {
        console.error("Error en el servicio de login:", error);
        return { success: false, error: error.message };
    }
};
