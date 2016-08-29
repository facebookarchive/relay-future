{
  fragments: {
    article: function article() {
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
            fieldName: 'title',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, _reactRelay2.default.QL.__frag(RQL_0)]),
          kind: 'Fragment',
          metadata: {},
          name: 'Article_ArticleRelayQL',
          type: 'Article'
        };
      }(_Tags2.default.getFragment('tagged'));
    }
  }
}
