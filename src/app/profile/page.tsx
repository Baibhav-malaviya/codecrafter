// pages/profile.tsx
import React from "react";

const Profile: React.FC = () => {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Profile</h1>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Profile Information</h2>
				<div className="bg-gray-100 p-4 rounded-md">
					<p>
						<strong>Name:</strong> John Doe
					</p>
					<p>
						<strong>Email:</strong> john.doe@example.com
					</p>
					{/* Add more user info here */}
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
				<div className="bg-gray-100 p-4 rounded-md">
					{/* Form for editing profile */}
					<form>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								type="text"
								className="border rounded-md w-full p-2"
								placeholder="Enter your name"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								type="email"
								className="border rounded-md w-full p-2"
								placeholder="Enter your email"
							/>
						</div>
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded-md"
						>
							Save Changes
						</button>
					</form>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Account Settings</h2>
				<div className="bg-gray-100 p-4 rounded-md">
					{/* Account settings options */}
					<p>
						<strong>Password:</strong> ******{" "}
						<button className="ml-2 text-blue-500">Change Password</button>
					</p>
					{/* Add more account settings here */}
				</div>
			</section>
		</div>
	);
};

export default Profile;
