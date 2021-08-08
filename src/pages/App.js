import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [bookmarks, setBookmarks] = useState([]);
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
					title: 'Replit',
					link: 'https://replit.com/new/nodejs'
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
		<div className="AppPage">
			This is the {props.page} page
			<p>Add a new bookmark</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="bookmark">Bookmark</label>
				<input
					type="text"
					id="title"
					value={singleBookmark.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="link"
					value={singleBookmark.link}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</form>
			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark._id}>
							The bookmark title is {bookmark.title} and its link is
							{' ' + bookmark.link}
							// <a href={bookmark.link}></a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
