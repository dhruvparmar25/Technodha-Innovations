// components/LoginForm.jsx
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Add switchToSignup to props
const LoginForm = ({ email, setEmail, password, setPassword, errors, handleSubmit, showPassword, togglePasswordVisibility, switchToForgot, switchToSignup }) => {
	return (
		<form onSubmit={handleSubmit}>
			{/* Email Input Group */}
			<div className="form-group">
				<label htmlFor="email" className="form-label">Email</label>
				<input
					type="text"
					className="form-input"	
					id="email"
					placeholder="Enter Your Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && (
					<div className="validation-error">{errors.email}</div>
				)}
			</div>

			{/* Password Input with Toggle */}
			<div className="form-group password-group">
				<label htmlFor="password" className="form-label">Password</label>
				<div className="input-with-icon-container">
					<input
						type={showPassword ? "text" : "password"}	
						className="form-input"
						id="password"
						placeholder="Enter Your Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="button"	
						className="password-toggle-button"
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaRegEyeSlash size={20} aria-label="Hide password" />
						) : (
							<FaRegEye size={20} aria-label="Show password" />
						)}
					</button>
				</div>
				{errors.password && (
					<div className="validation-error">{errors.password}</div>
				)}
			</div>
			
			{/* Options Row (Remember Me / Forgot Password) */}
			<div className="form-options-row">
				<div className="form-check-group">
					<input
						className="form-check-input"
						type="checkbox"
						id="rememberMe"
					/>
					<label className="form-check-label" htmlFor="rememberMe">
						Remember me
					</label>
				</div>
				{/* Switch View Handler (passed as a prop) */}
				<a	
					href="#"	
					className="forgot-password-link"	
					onClick={switchToForgot} // Prop call
				>
					Forgot password?
				</a>
			</div>

			<button type="submit" className="submit-button">
				Login
			</button>

			<div className="toggel-btn">
				Don't have an account ?		
				<a 
                    href="/signup" 
                    className="signup-link"
                    onClick={switchToSignup} // UPDATED: Use the prop for view switch
                >
					Sign Up
				</a>
			</div>
		</form>
	);
};

export default LoginForm;