function HighlightableList(props) {
    this._container = props.container;
    this._highlightTimeout = null;
    this._keywords = props.keywords;
    this._timeoutMs = 500;
}

HighlightableList.prototype.cancelRequest = function(e) {
    this._highlightTimeout = clearTimeout(this._highlightTimeout);
};

HighlightableList.prototype.generate = function() {
    this._keywords.forEach(function(keyword, i) {
        this._container.append($("<span/>")
            .hover(function(e) { this.requestHighlight(e, keyword); }.bind(this), this.cancelRequest.bind(this))
            .text(keyword)
        );
        if (i !== this._keywords.length - 1) {
            this._container.append(', ');
        }
    }.bind(this));
    $(document.body).click(function() {
        $(document.body).unhighlight();
    });
};

HighlightableList.prototype.requestHighlight = function(e, term) {
    this._highlightTimeout = setTimeout(function() {
        this._highlightTimeout = clearTimeout(this._highlightTimeout);
        $(document.body)
            .unhighlight()
            .highlight(term, { caseSensitive: true, wordsOnly: true });
    }, this._timeoutMs);
};
