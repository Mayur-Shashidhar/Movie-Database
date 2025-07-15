import React, { useState } from "react";

const initialForm = {
  title: "",
  year: "",
  poster: "",
  description: "",
  trailer: "",
};

const AddMovieForm = ({ onAddMovie }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.year || !form.poster) return;
    onAddMovie({
      ...form,
      id: Date.now().toString(),
    });
    setForm(initialForm);
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        required
      />
      <input
        name="poster"
        placeholder="Poster URL"
        value={form.poster}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="trailer"
        placeholder="YouTube Trailer URL"
        value={form.trailer}
        onChange={handleChange}
      />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm; 