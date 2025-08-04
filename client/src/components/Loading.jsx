const Loading = () => {
    return (
        <div id="loading" className="d-inline-flex align-items-center justify-content-center mx-auto w-100 py-5">
            <div>
                <img src="images/spinning-baseball.webp" alt="Loading"></img>
            </div>
            <div className="fs-2 pl-2">Loading</div>
        </div>
    );
}

export default Loading;