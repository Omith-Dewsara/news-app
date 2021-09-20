import React from "react";
import "../styles/News.css";
import { Card, Typography, CardMedia, CardActionArea, Button, CardActions } from "@material-ui/core"
import { useDataLayerValue } from "../DataLayer";

function News({ imgUrl, title, description, url, date }) {
	const subStr = (str, char) => {
		return str?.substr(0, char - 3) + "...";
	}

	const [state, dispatch] = useDataLayerValue();

	return (
		<Card className="news">
			<CardActionArea className="news__image">
				<CardMedia 
					image={imgUrl}
	          		title="Contemplative Reptile"
				/>
			</CardActionArea>
			<Typography 
				className="news__title"	
			> 
				{ subStr(title, 57) } 
			</Typography>
			<Typography 
				variant="body2" 
				color="textSecondary" 
				component="p"
				className="news__description"
			>
	            {
	            	subStr(description, 127)
	            }
          </Typography>
          	
          	<CardActions className="news__buttons">
          		<a href={url}>
		          	<Button 
		          		size="small" 
		          		color="primary"
		          	>
		          		Learn More
		        	</Button>
	        	</a>
        	</CardActions>
        	<Typography className="news__postedDate">
        		{ date.substr(0, 10) }
        	</Typography>
		</Card>
	)
}

export default News;