const HN_SITE_URL = 'https://angular2-hn.firebaseapp.com/news/1';
//const HN_SITE_URL = 'https://mithril-hn.firebaseapp.com/';
//const HN_SITE_URL = 'https://next-hnpwa.now.sh/';
//const HN_SITE_URL = 'https://hn.nuxtjs.org/news';

const hnSiteName = HN_SITE_URL.split('/').filter(p => p && p !== '#').pop();

describe(`hnpwa: ${hnSiteName}`, () => {

  beforeEach(() => {
    cy.visit(HN_SITE_URL);
  });

  it('should visit page', () => {

    // assert
    cy.url().should('equal', HN_SITE_URL);

  });

  it('should have specific top story', () => {

    // arrange
    const title = 'This is the first story';

    cy.intercept(/^https:\/\/node-hnapi\.herokuapp\.com\//, {
      headers: {'access-control-allow-origin': '*'},
      fixture: 'hacker-news'
    });
    cy.visit(HN_SITE_URL);

    // assert
    cy.get('.post:nth-child(1)').should('contain', title);

  });

  it('should load stories', () => {

    // arrange
    //cy.intercept(/^https:\/\/node-hnapi\.herokuapp\.com\//).as('getStories');
    //cy.wait('@getStories');

    // assert
    cy.get('.list-margin>li').should('have.length', 30);

  });

});
