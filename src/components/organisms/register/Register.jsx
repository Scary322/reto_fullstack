import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MOCK_USERS from "../../../mockdata/users"
import { registerFullUser } from "../../../firebase/auth"


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    /*
    // Validar email único
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...MOCK_USERS, ...existingUsers];
    const emailExists = allUsers.some(user => user.email === formData.email);
    if (emailExists) {
      setError('El email ya está registrado.');
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(), // ID único basado en timestamp
      name: formData.name,
      email: formData.email,
      cellphone: formData.cellphone,
      address: formData.address,
      password: formData.password
    };

    // Guardar en localStorage
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Navegar a login
    navigate('/login');
    */

    const respuesta = await registerFullUser(formData);

    if (respuesta.success) {
      navigate('/login');
    } else {
      setError(respuesta.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Reducción de max-w y padding para evitar el scroll vertical */}
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden transition-all">
        <div className="p-6 md:p-10">

          <header className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Crear cuenta</h2>
            <p className="text-slate-300 text-sm mt-1">Únete a nuestra comunidad hoy mismo</p>
          </header>

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

              {/* Columna Izquierda: Información Personal */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all placeholder:text-secondary bg-transparent text-primary"
                    placeholder="Ej. Juan Pérez"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all placeholder:text-secondary bg-transparent text-primary"
                    placeholder="correo@ejemplo.com"
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Celular</label>
                    <input
                      type="tel"
                      name="cellphone"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all bg-transparent text-primary"
                      placeholder="+57 300..."
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all bg-transparent text-primary"
                      placeholder="Calle 123..."
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Seguridad */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all bg-transparent text-primary"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                  <p className="text-[10px] text-secondary mt-1 italic">Mínimo 8 caracteres (letras y números).</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 focus:border-[var(--color-brand-blue)] outline-none transition-all bg-transparent text-primary"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Acción y Footer más compactos */}
            <div className="pt-4 space-y-4">
              <button
                type="submit"
                className="btn-dna w-full text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-base"
              >
                Registrarse
              </button>

              <p className="text-center text-sm text-secondary">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-[var(--color-brand-blue)] font-semibold hover:underline">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;