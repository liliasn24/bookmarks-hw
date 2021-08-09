import React, { useState, useEffect } from 'react';

export default function Home(props) {
	const [bookmarks, setBookmarks] = useState([]);

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

	return (
		<div className="HomePage">
			<ul>
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark._id}>
							<a href={bookmark.link}>{bookmark.title}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
