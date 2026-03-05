import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./AuthModal.scss";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email": return "Email invalide.";
      case "auth/user-not-found": return "Aucun compte avec cet email.";
      case "auth/wrong-password": return "Mot de passe incorrect.";
      case "auth/email-already-in-use": return "Cet email est déjà utilisé.";
      case "auth/weak-password": return "Le mot de passe doit contenir au moins 6 caractères.";
      default: return "Une erreur est survenue. Réessaie.";
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>✕</button>

        <h2 className="auth-modal__title">
          {isLogin ? "Connexion" : "Créer un compte"}
        </h2>

        <button className="auth-modal__google" onClick={handleGoogle}>
          <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
          Continuer avec Google
        </button>

        <div className="auth-modal__divider">
          <span>ou</span>
        </div>

        <input
          className="auth-modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-modal__input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <p className="auth-modal__error">{error}</p>}

        <button
          className="auth-modal__submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>

        <p className="auth-modal__switch">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }}>
            {isLogin ? " S'inscrire" : " Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;