import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.currentTarget.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetRaw = event.currentTarget.id;
        let targetId = targetRaw.substring(targetRaw.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    
    handleTitleCheck = (e, url) => {
        e.stopPropagation();
        if(this.state.isDragging) return;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song, removeSongCallback, duplicateSongCallback } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass = "song-card-dragged-to";
        }

        let yearText = ""
        if (song.year !== undefined && song.year !== null && String(song.year).trim() !== "") {
            yearText = " (" + song.year + ") ";
        }
        let youtubeUrl = "https://youtube.com/watch?v=" + song.youTubeId
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
            >
                <span className="song-card-number">{num}.</span>
                <span className="song-card-title">
                    <a href={youtubeUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        draggable="false" 
                        onDragStart={(e) => e.preventDefault()} 
                        onMouseDown={(e => e.stopPropagation())} 
                        onClick={(e => this.handleTitleCheck(e, youtubeUrl))}>
                            {song.title}
                    </a>
                </span>
                <span className="song-card-year">{yearText}</span>
                <span className="song-card-by"> by </span>{" "}
                <span className="song-card-artist">{song.artist}</span>

                <input 
                    type="button"
                    id={"duplicate-song-" + num}
                    className="card-button song-card-duplicate"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => duplicateSongCallback(Number(num) - 1)}
                    value={"⎘"}
                />
                <input 
                    type="button"
                    id={"delete-song-" + num}
                    className="card-button song-card-trash"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => removeSongCallback(Number(num) - 1)}
                    value={"🗑"}
                />
            </div>
        )
    }
}