
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {id: 1, name: 'Sarah J. Maas', picture: '/assets/img/author1.jpg', shortbio: 'Sarah J. Maas (born 5 March 1986) is an American fantasy author. She is best known for her debut novel, Throne of Glass, published in 2012 by Bloomsbury. A Court of Thorns and Roses is her other popular series.'},
        {id: 2, name: 'Romano De Marco', picture: '/assets/img/author2.png', shortbio: 'Abruzzese, born in 1965, made his debut as an author in 2009 with FERRO E FUOCO (Giallo Mondadori n. 2974 republished for bookshops, in 2012 by Pendragon editions). In 2011 he released his MILAN A MANO ARMATA, (Foschi Editore, Lomellina Award in thriller 2012). In January 2013 it was the turn of A CASA DEL DIAVOLO (Time Crime, Fanucci - second place in the Nebbia Gialla 2013 award). In 2014 he publishes with Feltrinelli I LA TROVERO \'(Fox Crime series, 2014) which is followed by CITTA\' DI POLVERE (Narrative 2015) and MORTE DI LUNA (Zoom Filtri, 2015). From 2017 he passes to the publisher PIEMME with which he publishes L\'UOMO DI CASA (readers\' prize at the noir festival, Scerbanenco award 2017) and IF THE NIGHT IS SEARCHING FOR YOU (Premio Fedeli 2018). It is translated in Spain, has published stories and articles on Linus, Il Corriere della sera and on the collections of Giallo Mondadori.'},
        {id: 3, name: 'Nicole Melleby', picture: '/assets/img/author3.jpg', shortbio: 'Nicole Melleby is a born-and-bred Jersey girl with a passion for storytelling. She studied creative writing at Fairleigh Dickinson University and currently teaches creative writing and literature courses with a handful of local universities.'},
        {id: 4, name: 'James Polchin', picture: '/assets/img/author4.jpg', shortbio: 'James Polchin is a cultural critic and professor at New York University. He is held faculty appointments in the Princeton Writing Program, the Parsons School of Design, and the New School for Public Engagement, and has given talks on art history, literary journalism, and queer history at universities in the US and UK'},
        {id: 5, name: 'Roseanna M. White', picture: '/assets/img/author5.jpg', shortbio: 'Roseanna M. White is a bestselling, Christy Award nominated author who has long claimed that words are the air she breathes. When not writing fiction, she’s homeschooling her two kids, editing, designing book covers, and pretending her house will clean itself.'},
      ]);
    });
};
