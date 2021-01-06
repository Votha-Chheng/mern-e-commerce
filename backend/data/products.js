const products = [
  {
    _id:63,
    nom : "Conifère flotté",
    catégorie : "lampadaires",
    prix : 0,
    stock : 1,
    image : '/images/conifere-flotte.jpg',
    livraison : true,
  },
  {
    _id:62,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 120,
    stock : 1,
    image : '/images/lampe-en-bois-flotte.jpg',
    livraison : true,
  },
  {
    _id:61,
    nom : "Bois dansants",
    catégorie : "lampes en bois flotté",
    prix : 65,
    stock : 1,
    image : '/images/bois-dansants.jpg',
    livraison : true,
  },
  {
    _id:60,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 1,
    image : '/images/lampe-en-bois-flotte.jpg',
    livraison : true,

  },
  {
    _id:59,
    nom : "PVC étoilé",
    catégorie : "lampes en bois brut et autres",
    prix : 40,
    stock : 1,
    image : '/images/lampe-en-pvc-recycle.jpg',
    livraison : true,
  },
  {
    _id:58,
    nom : "Lampadaire en bois flotté",
    catégorie : "lampadaires",
    prix : 95,
    stock : 1,
    image : '/images/lampadaire-en-bois-flotte.jpg',
    livraison : false
  },
  {
    _id:57,
    nom : "Lampadaire en bois flotté",
    catégorie : "lampadaires",
    prix : 95,
    stock : 1,
    image : '/images/lampadaire-en-bois-flotte(1).jpg',
    livraison : false
  },
  {
    _id:56,
    nom : "Casque ailé",
    catégorie : "lampes en bois flotté",
    prix : 120,
    stock : 1,
    image : '/images/casque-aile.jpg'
  },
  {
    _id:55,
    nom : "L'Hydre",
    catégorie : "lampes en bois flotté",
    prix : 155,
    stock : 1,
    image : '/images/l-hydre.jpg',
    livraison : true,
  },

  {
    _id:54,
    nom : "Le chevron flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 1,
    image : '/images/le-chevron-flotte.jpg',
    livraison : true,
  },
  {
    _id:53,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18014.jpg'
  },
  {
    _id:52,
    nom : "L'Eléphant",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L19002.jpg'
  },
  {
    _id:51,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 50,
    stock : 1,
    livraison : true,
    image : '/images/L18012.jpg'
  },
  {
    _id:50,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18011.jpg'
  },
  {
    _id:49,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18009.jpg'
  },
  {
    _id:48,
    nom : "Double",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 1,
    livraison : true,
    image : '/images/L18008.jpg'
  },
  {
    _id:47,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 1,
    livraison : true,
    image : '../images/L18006.jpg'
  },
  {
    _id:46,
    nom : "Lampe à poser",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 5,
    livraison : true,
    image : '/images/L18004.jpg'
  },
  {
    _id:45,
    nom : "Ca va trancher!",
    catégorie : "lampes en bois flotté",
    prix : 80,
    stock : 3,
    livraison : true,
    image : '/images/L18023.jpg'
  },
  {
    _id:44,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 1,
    livraison : true,
    image : '/images/L18029.jpg'
  },
  {
    _id:43,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18027.jpg'
  },
  {
    _id:42,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 5,
    livraison : true,
    image : '/images/L18037.jpg'
  },
  {
    _id:41,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18038.jpg'
  },
  {
    _id:40,
    nom : "Lampe de sol en bois flotté",
    catégorie : "lampadaires",
    prix : 55,
    stock : 2,
    livraison : true,
    image : '/images/L18042.jpg'
  },
  {
    _id:39,
    nom : "Flammes dansantes",
    catégorie : "lampes en bois flotté",
    prix : 55,
    stock : 1,
    livraison : true,
    image : '/images/L18044.jpg'
  },

  {
    _id:38,
    nom : "L'Elégante",
    catégorie : "lampes en bois flotté",
    prix : 90,
    stock : 0,
    image : '/images/L19001.jpg'
  },
  {
    _id:37,
    nom : "Colonne lumineuse",
    catégorie : "lampadaires",
    prix : 120,
    stock : 1,
    livraison : true,
    image : '/images/L19003.jpg'
  },
  {
    _id:36,
    nom : "Boite à lumières",
    catégorie : "lampes en bois brut et autres",
    prix : 50,
    stock : 1,
    livraison : true,
    image : '/images/boite-a-lumieres.jpg'
  },
  {
    _id:35,
    nom : "Boite à lumières",
    catégorie : "lampes en bois brut et autres",
    prix : 50,
    stock : 2,
    livraison : true,
    image : '/images/L19006.jpg'
  },
  {
    _id:34,
    nom : "L'encadrée",
    catégorie : "lampes en bois brut et autres",
    prix : 110,
    stock : 1,
    livraison : true,
    image : '/images/l-encadree.jpg'
  },
  {
    _id:32,
    nom : "Les Mouettes",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 0,
    image : '/images/les-mouettes.jpg'
  },
  {
    _id:31,
    nom : "Racines flottées",
    catégorie : "lampes en bois flotté",
    prix : 70,
    stock : 1,
    livraison : true,
    image : '/images/L19015.jpg'
  },
  {
    _id:30,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18026.jpg'
  },
  {
    _id:29,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18022.jpg'
  },
  {
    _id:28,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 3,
    livraison : true,
    image : '/images/L18021.jpg'
  },
  {
    _id:27,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 3,
    livraison : true,
    image : '/images/L18020.jpg'
  },

  {
    _id:25,
    nom : "Lampe de chevet",
    catégorie : "lampes en bois brut et autres",
    prix : 80,
    stock : 1,
    livraison : true,
    image : '/images/L18018.jpg'
  },
  {
    _id:24,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 95,
    stock : 1,
    livraison : true,
    image : '/images/L18017.jpg'
  },
  {
    _id:23,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 105,
    stock : 3,
    livraison : true,
    image : '/images/L18016.jpg'
  },
  {
    _id:22,
    nom : "Lampe en bois flotté",
    catégorie : "lampes en bois flotté",
    prix : 70,
    stock : 1,
    livraison : true,
    image : '/images/L19012.jpg'
  }
]

export default products