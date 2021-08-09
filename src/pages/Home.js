import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
