function HighlightableList(props) {
    this._container = props.container;
    this._keywords = props.keywords;
}

HighlightableList.prototype.generate = function() {
    this._keywords.forEach(function(keyword, i) {
        this._container.append($("<span/>")
            .bind("click", function(e) { this.highlight(e, keyword); }.bind(this))
            .text(keyword)
        );
        if (i !== this._keywords.length - 1) {
            this._container.append(", ");
        }
    }.bind(this));
    $(document.body).click(function() {
        $(document.body).unhighlight();
    });
};

HighlightableList.prototype.highlight = function(e, term) {
    e.stopPropagation();
    console.log('highlight');
    $(document.body)
        .unhighlight()
        .highlight(term, { caseSensitive: true, wordsOnly: true });
};
