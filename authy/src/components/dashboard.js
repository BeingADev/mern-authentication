import React, { useCallback, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/usersService";

const DashBoard = () => {
	const [users, setUsers] = useState([]);

	const userList = async () => {
		try {
			const { data } = await getUsers();
			setUsers(data);
		} catch (error) {}
	};

	const removeUser = useCallback(async (id) => await deleteUser(id));

	useEffect(() => {
		userList();
	}, [removeUser]);

	return (
		<div className='userContainer'>
			<h1>DashBoard</h1>
			<table>
				<tbody>
					<tr>
						<th style={{ width: "20px" }}></th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
					{users.map((user, i) => (
						<tr key={user._id}>
							<td style={{ width: "20px" }}>{i}</td>
							<td data-th='First Name'>{user.firstName}</td>
							<td data-th='Last Name'>{user.lastName}</td>
							<td data-th='Email'>{user.email}</td>
							<td data-th='Action'>
								<button className='button' onClick={() => removeUser(user._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DashBoard;
