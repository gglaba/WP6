import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../service/media.service';

interface NearbyPlace {
  emoji: string;
  name: string;
  address: string;
  walk: number;
  distance: number;
}

interface Photo {
  url: string;
  alt: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Surrounding {
  emoji: string;
  title: string;
  desc: string;
}

interface TimelinePhoto {
  url: string;
  alt: string;
}

interface TimelineEra {
  year: string;
  label: string;
  title: string;
  desc: string;
  photos: TimelinePhoto[];
  sepia: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, AfterViewInit {

  exteriorPhotos: Photo[] = [];
  timeline: TimelineEra[] = [];
  nearbyPlaces: NearbyPlace[] = [];
  features: Feature[] = [];
  surroundings: Surrounding[] = [];
  heroPhoto = '';
  historyPhoto = '';

  age = new Date().getFullYear() - 1896;

  currentEra = 0;
  currentPhotoIndex = 0;

  constructor(private media: MediaService) {}

  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

ngAfterViewInit(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -80px 0px' // ← element musi być 80px w viewport żeby się pokazał
    }
  );

  this.animElements.forEach((el) => {
    observer.observe(el.nativeElement);
  });
}

  ngOnInit(): void {
    this.exteriorPhotos = [
      { url: this.media.photo('zewnatrz/20260604_124625.jpg'), alt: 'Wejście główne' },
      { url: this.media.photo('zewnatrz/20260604_124743.jpg'), alt: 'Budynek od strony ulicy' },
      { url: this.media.photo('zewnatrz/20260604_124540.jpg'), alt: 'Parking oraz wejście boczne' },
    ];

    this.heroPhoto = this.media.photo('zewnatrz/20260604_124625.jpg');
    this.historyPhoto = this.media.photo('zewnatrz/20260604_124516.jpg');

    this.timeline = [
      {
        year: '1927',
        label: 'Pierwsze zdjęcie',
        title: 'Willa w swoim pierwotnym kształcie',
        desc: 'Budynek w oryginalnej formie architektonicznej charakterystycznej dla przełomu XIX i XX wieku. Zabytkowa fasada i detale architektoniczne odzwierciedlają styl i funkcję willi mieszkalnej z tamtego okresu.',
        sepia: true,
        photos: [
          {
            url: this.media.photo('historyczne/Szkola_Podstawowa_nr_1_im_gen_Jozefa_Bema_ul_Wojska_Polskiego_Bystrzyca_Klodzka_107777-1927.jpg'),
            alt: 'Budynek w 1927 roku'
          }
        ]
      },
      {
        year: '2012–2020',
        label: 'Remont',
        title: 'Kompleksowy remont od podstaw',
        desc: 'Dekada prac remontowych i renowacji. Budynek odzyskał świetność zachowując historyczny charakter. Włożono ogromny wysiłek w zachowanie stylu i klasy budynku, jednocześnie dostosowując go do współczesnych standardów i potrzeb.',
        sepia: false,
        photos: [
          {
            url: this.media.photo('historyczne/Szkola_Podstawowa_nr_1_im_gen_Jozefa_Bema_ul_Wojska_Polskiego_Bystrzyca_Klodzka_15359-2004.jpg'),
            alt: 'Remont 2004-2014'
          },
          {
            url: this.media.photo('historyczne/Widok_z_Baszty_Klodzkiej_Bystrzyca_Klodzka_4203986-2013rok.jpg'),
            alt: 'Remont 2004-2014'
          },
        ]
      },
      {
        year: 'Dziś',
        label: 'Teraźniejszość',
        title: 'Nowoczesne biura w zabytkowych murach',
        desc: 'Gotowe do wynajęcia lokale użytkowe łączące historyczny klimat willi z pełnym komfortem współczesnego miejsca pracy. Prywatny parking, monitoring 24/7 i prestiżowa lokalizacja w centrum Bystrzycy Kłodzkiej.',
        sepia: false,
        photos: [
          { url: this.media.photo('zewnatrz/20260604_124625.jpg'), alt: 'Wejście główne' },
          { url: this.media.photo('zewnatrz/20260604_124743.jpg'), alt: 'Budynek od strony ulicy' },
          { url: this.media.photo('zewnatrz/20260604_124540.jpg'), alt: 'Parking oraz wejście boczne' },
        ]
      }
    ];

    this.nearbyPlaces = [
      {
        emoji: '🏛️',
        name: 'Ratusz i Rynek',
        address: 'plac Wolności 1',
        walk: 4,
        distance: 280
      },
      {
        emoji: '🏢',
        name: 'Urząd Miasta i Gminy',
        address: 'plac Wolności 1 oraz plac Wolności 3/4',
        walk: 4,
        distance: 300
      },
      {
        emoji: '🏢',
        name: 'Oddział Starostwa Powiatowego',
        address: 'ul. Henryka Sienkiewicza 5',
        walk: 5,
        distance: 400
      },
      {
        emoji: '💼',
        name: 'Urząd Skarbowy',
        address: 'ul. Adama Mickiewicza 5',
        walk: 8,
        distance: 550
      },
      {
        emoji: '🏦',
        name: 'Prokuratura Rejonowa w Bystrzycy Kłodzkiej',
        address: 'ul. Stefanii Sempołowskiej 4',
        walk: 1,
        distance: 95
      }
    ];

    this.features = [
      {
        icon: 'pi-car',
        title: 'Prywatny parking',
        desc: 'Parking na terenie posesji, za bramą i ogrodzeniem — dostępny wyłącznie dla najemców i ich klientów.'
      },
      {
        icon: 'pi-video',
        title: 'Monitoring 24/7',
        desc: 'Teren całej posesji objęty całodobowym monitoringiem wizyjnym.'
      },
      {
        icon: 'pi-map-marker',
        title: 'Świetna lokalizacja',
        desc: 'Najważniejsze miejsca w Bystrzycy Kłodzkiej w zasięgu kilku minut spacerem.'
      }
    ];

    this.surroundings = [
      {
        emoji: '🏰',
        title: 'Średniowieczne mury miejskie',
        desc: 'Budynek sąsiaduje bezpośrednio z zabytkowym obwodem murów obronnych Bystrzycy Kłodzkiej. Przejście przez bramę w murach znacznie skraca drogę do Rynku i Urzędu Miasta.'
      },
      {
        emoji: '🏫',
        title: 'Szkoła Podstawowa nr 1',
        desc: 'Tuż obok znajduje się zabytkowy budynek Szkoły Podstawowej nr 1 im. gen. Józefa Bema - jedna z architektonicznych perełek miasta, wpisana w historyczny krajobraz tej części Bystrzycy.'
      },
      {
        emoji: '⛪',
        title: 'Kościół parafialny',
        desc: 'W bezpośrednim sąsiedztwie budynku stoi kościół pw. Św. Michała Archanioła - ważny punkt orientacyjny i element historycznego centrum miasta.'
      }
    ];
  }

  selectEra(index: number): void {
    this.currentEra = index;
    this.currentPhotoIndex = 0;
  }

  selectPhoto(index: number): void {
    this.currentPhotoIndex = index;
  }

  get activeEra(): TimelineEra {
    return this.timeline[this.currentEra];
  }

  get activePhoto(): TimelinePhoto {
    return this.activeEra.photos[this.currentPhotoIndex];
  }
}