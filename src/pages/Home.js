import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [bookmarks, setBookmarks] = useState([]); // Bookmarks state
	const [singleBookmark, setBookmark] = useState({
		title: '',
		link: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmarks');
				const data = await response.json();
				setBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleClick = async e => {
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: '',
					link: ''
				})
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]);
			setBookmark(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleBookmark)
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]);
			setBookmark({
				title: '',
				link: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setBookmark({ ...singleBookmark, [e.target.id]: e.target.value });
	};
	return (
		<div className="HomePage">
			<h1>Bookmark Manager</h1>
			<form className="bookmark" onSubmit={handleSubmit}>
				<label className="position" name="name">
					Add Bookmark
				</label>
				<input
					type="text"
					id="title"
					value={singleBookmark.title}
					onChange={handleChange}
				/>
				<label className="position" name="link">
					Add Link
				</label>
				<input
					type="text"
					id="link"
					value={singleBookmark.link}
					onChange={handleChange}
				/>
				<input className="position" type="submit" value="Submit" />
			</form>

			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark._id}>
							<Link to={`/${bookmark._id}`}>
								<h2>{bookmark.title}</h2>
							</Link>
							<p>
								<a href={bookmark.link}>click here</a>
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
