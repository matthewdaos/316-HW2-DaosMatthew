import React, { Component } from 'react';

export default class EditSongModal extends Component {
    constructor(props) {
        super(props);
        let s = props.song || {};
        this.state = {
            title: s.title || "",
            artist: s.artist || "",
            youTubeId: s.youTubeId || "",
            year: s.year || ""
        }
        this.firstInputRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        let prevVisible = prevProps && prevProps.isVisible;
        let nowVisible = this.props && this.props.isVisible;

        if(this.props.song !== prevProps.song || (nowVisible && !prevVisible)) {
            let s = this.props.song || {};
            this.setState({
                title: s.title || "",
                artist: s.artist || "",
                youTubeId: s.youTubeId || "",
                year: s.year || ""
            }, () => {
                let root = document.getElementById("edit-song-modal");
                let isOpen = root && root.classList.contains("is-visible");
                if(isOpen && this.firstInputRef.current) {
                    this.firstInputRef.current.focus();
                    this.firstInputRef.current.select();
                }
            });
        }
    }

    handleCancel = () => {
        let { onCancel } = this.props;
        onCancel && onCancel();
    }

    handleConfirm = () => {
        let { onConfirm } = this.props;
        let payload = {
            title: this.state.title,
            artist: this.state.artist,
            youTubeId: this.state.youTubeId,
            year: String(this.state.year).trim()
        };
        onConfirm && onConfirm(payload);
    }

    handleKeyDown = (e) => {
        if(e.key === "Escape") {
            this.handleCancel();
        }
        if(e.key === "Enter") {
            this.handleConfirm();
        }
    }

    render() {
        return (
            <div
                class="modal"
                id="edit-song-modal"
                data-animation="slideInOutLeft"
                onClick={this.handleCancel}
            >
                <div
                    class="modal-root"
                    id="edit-song-modal-root"
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={this.handleKeyDown}
                >
                    <div class="modal-north">Edit Song</div>

                    <div class="modal-center">
                        <div class="modal-center-content">
                            <div class="modal-row">
                                <label class="modal-prompt" htmlFor="edit-song-title">Title</label>
                                <input 
                                    id="edit-song-title"
                                    class="modal-textfield"
                                    type="text"
                                    ref={this.firstInputRef}
                                    value={this.state.title}
                                    onChange={(e) => this.setState({ title: e.target.value})} 
                                />
                            </div>

                            <div class="modal-row">
                                <label class="modal-prompt" htmlFor="edit-song-artist">Artist</label>
                                <input 
                                    id="edit-song-artist"
                                    class="modal-textfield"
                                    type="text"
                                    value={this.state.artist}
                                    onChange={(e) => this.setState({ artist: e.target.value})} 
                                />
                            </div>

                            <div class="modal-row">
                                <label class="modal-prompt" htmlFor="edit-song-year">Year</label>
                                <input 
                                    id="edit-song-year"
                                    class="modal-textfield"
                                    type="text"
                                    value={this.state.year}
                                    onChange={(e) => this.setState({ year: e.target.value})} 
                                />
                            </div>

                            <div class="modal-row">
                                <label class="modal-prompt" htmlFor="edit-song-youTubeId">YouTube Id</label>
                                <input 
                                    id="edit-song-youTubeId"
                                    class="modal-textfield"
                                    type="text"
                                    value={this.state.youTubeId}
                                    onChange={(e) => this.setState({ youTubeId: e.target.value})} 
                                />
                            </div>
                        </div>
                    </div>

                    <div class="modal-south">
                        <input 
                            type="button"
                            id="edit-song-confirm-button"
                            class="modal-button"
                            onClick={this.handleConfirm}
                            value={"Confirm"} 
                        />
                        <input 
                            type="button"
                            id="edit-song-cancel-button"
                            class="modal-button"
                            onClick={this.handleCancel}
                            value={"Cancel"} 
                        />
                    </div>
                </div>
            </div>
        )
    }

}