import React, { useState, useEffect } from 'react';

export default function Show(props) {
	const [bookmark, setBookmark] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				const data = await response.json();
				setBookmark(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	return (
		<div className="ShowPage">
			{Object.keys(bookmark).length ? (
				<>
					<h3>
						<a href={bookmark.link}>{bookmark.title}</a>
					</h3>
					// <p>{bookmark.link}</p>
					<button onClick={handleDelete}>Delete</button>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}
