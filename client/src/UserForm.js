import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/users';

//const baseURL = process.env.REACT_APP_API_URL;

const UserForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        gender: '',
        interests: [],
        country: '',
    });
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchUsers = async () => {
        const res = await axios.get(API);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const updated = checked
                ? [...form.interests, value]
                : form.interests.filter((i) => i !== value);
            setForm({ ...form, interests: updated });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`${API}/${editId}`, form);
        } else {
            await axios.post(API, form);
        }
        setForm({
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            gender: '',
            interests: [],
            country: '',
        });
        setEditId(null);
        fetchUsers();
    };

    const handleEdit = async (user) => {
        setForm(user);
        setEditId(user._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>First Name:</label>
                    <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Last Name:</label>
                    <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Phone num:</label>
                    <input name="phone" placeholder="Phone no" value={form.phone} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Address:</label>
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Gender:</label>
                    <div className="horizontal-options">
                        <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} />Male</label>
                        <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} />Female</label>
                    </div>
                </div>

                <div className="input-group">
                    <label>Interests:</label>
                    <div className="interest-options">
                        <div>
                            <label><input type="checkbox" name="interests" value="Reading" checked={form.interests.includes('Reading')} onChange={handleChange} />Reading</label>
                            <label><input type="checkbox" name="interests" value="Writing" checked={form.interests.includes('Writing')} onChange={handleChange} />Writing</label>
                        </div>
                        <div>
                            <label><input type="checkbox" name="interests" value="Cooking" checked={form.interests.includes('Cooking')} onChange={handleChange} />Cooking</label>
                            <label><input type="checkbox" name="interests" value="Sports" checked={form.interests.includes('Sports')} onChange={handleChange} />Sports</label>
                        </div>
                        <div>
                            <label><input type="checkbox" name="interests" value="Coding" checked={form.interests.includes('Coding')} onChange={handleChange} />Coding</label>
                            <label><input type="checkbox" name="interests" value="Painting" checked={form.interests.includes('Painting')} onChange={handleChange} />Painting</label>
                        </div>
                    </div>
                </div>


                <div className="input-group">
                    <label>Country:</label>
                    <select name="country" value={form.country} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Germany">Germany</option>
                    </select>
                </div>

                <button type="submit">{editId ? 'Update' : 'Submit'}</button>
            </form>

            <h3>User List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.phone}</td>
                            <td>{u.gender}</td>
                            <td>{u.country}</td>
                            <td>
                                <button onClick={() => handleEdit(u)}>Edit</button>
                                <button onClick={() => handleDelete(u._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserForm;
