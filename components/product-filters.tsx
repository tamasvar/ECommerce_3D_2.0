"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import LoadingSpinner from "@/app/loading";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "animeandmanga", label: "Anime And Manga" },
      { value: "busts", label: "Busts" },
      { value: "cartoon", label: "Cartoon" },
      { value: "cosplay", label: "Cosplay" },
      { value: "dc", label: "DC" },
      { value: "dragonballz", label: "Dragon Ball Z" },
      { value: "games", label: "Games" },
      { value: "marvel", label: "Marvel" },
      { value: "movies", label: "Movies" },
      { value: "nsfw", label: "NSFW" },
      { value: "futa", label: "Futanari" },
      { value: "othercomics", label: "Other Comics" },
      { value: "starwars", label: "Star Wars" },
      { value: "warhammer", label: "Warhammer" },
      
    ],
  },
  {
    id: "arts",
    name: "Arts",
    options: [
      { value: "digitaldark", label: "Digital Dark" },
      { value: "gabrielmeyer", label: "Gabriel Meyer" },
      { value: "francisquez", label: "Francisquez" },
      { value: "exclusive3dprints", label: "Exclusive3dprints" },
      { value: "esmonster", label: "E.S Monster" },
      { value: "dinamuuu3d", label: "Dinamuuu3d" },
      { value: "depaula", label: "De Paula" },
      { value: "cnjonvi", label: "CN Jonvi" },
      { value: "chuyafactory", label: "Chuya Factory" },
      { value: "casculpts", label: "CA.Sculpts" },
      { value: "chagarin", label: "CHAGARIN" },
      { value: "cgpyrodigitalart", label: "CG Pyro Digital Art" },
      { value: "carlospsilva", label: "Carlos-P-Silva" },
      { value: "cardoso3dstudio", label: "Cardoso3dstudio" },
      { value: "ca3dart", label: "CA3DART" },
      { value: "brunoart3dstl", label: "BrunoArt3DSTL " },
      { value: "bulkamancer", label: "Bulkamancer" },
      { value: "brianmiroglio", label: "Brian Miroglio" },
      { value: "barruzstudio", label: "BarruzStudio" },
      { value: "bahabbalam", label: "Bahab Balam" },
      { value: "b3dserk", label: "B3DSERK" },
      { value: "azerama", label: "AZERAMA" },
      { value: "aveen3d", label: "Aveen3d" },
      { value: "3dsqulpts", label: "3DSQULPTS" },
      { value: "artifex3d", label: "Artifex3d" },
      { value: "arkevzstudios", label: "Arkevz Studios" },
      { value: "aliance", label: "Aliance" },
      { value: "akashsingh", label: "Akash Singh" },
      { value: "abe3d", label: "Abe3D" },
      { value: "3dwicked", label: "3DWicked" },
      { value: "3dmoonn", label: "3DMoonn" },
      { value: "generalbuta", label: "General Buta" },
      { value: "gonzalouribe", label: "Gonzalo Uribe" },
      { value: "gsculptart", label: "Gsculpt Art" },
      { value: "h3ll", label: "H3LL" },
      { value: "hawo", label: "HAWO" },
      { value: "hybrisstudio", label: "Hybris Studio" },
      { value: "igorlopes", label: "Igor Lopes" },
      { value: "inakisculpts", label: "Inaki Sculpts" },
      { value: "johnken", label: "JohnKen" },
      { value: "kcstudio", label: "KcStudio" },
      { value: "kitsuneart", label: "KitsuneArt" },
      { value: "kutonsculpts", label: "KutonSculpts" },
      { value: "lacasette", label: "LacaSette" },
      { value: "luftmenschstudio", label: "Luftmensch Studio" },
      { value: "marcoart", label: "Marco ART" },
      { value: "messias3dfigure", label: "Messias3DFigure" },
      { value: "michelballares", label: "Michel Ballares" },
      { value: "momoji3d", label: "Momoji3d" },
      { value: "mysticflare", label: "Mystic Flare" },
      { value: "nachocg", label: "NACHOCG" },
      { value: "nandosonny", label: "Nandosonny" },
      { value: "nationrodera3dstudios", label: "Nationrodera3DStudios" },
      { value: "nekofigurines", label: "Neko Figurines" },
      { value: "nomnomfigures", label: "NomNom Figures" },
      { value: "officerrhu", label: "Officer-Rhu" },
      { value: "oxo3d", label: "OXO3D" },
      { value: "pearforceone", label: "PearForceOne" },
      { value: "pggasta", label: "Pggasta" },
      { value: "pinkstudio", label: "Pink Studio" },
      { value: "polybitsart", label: "PolyBitsArt" },
      { value: "poptotem", label: "POP Totem" },
      { value: "preystl", label: "Preystl" },
      { value: "ritualcasting", label: "Ritual Casting" },
      { value: "rks3dcollectibles", label: "RKS3D Collectibles" },
      { value: "romfx", label: "Romfx" },
      { value: "rubim", label: "RUBIM" },
      { value: "rushzilla", label: "Rushzilla" },
      { value: "sanix", label: "Sanix" },
      { value: "shinjibom", label: "ShinjiBom" },
      { value: "sideshow", label: "SIDESHOW" },
      { value: "skyler3dstudios", label: "Skyler3DStudios" },
      { value: "stepanovsculpts", label: "Stepanovsculpts" },
      { value: "stlproject", label: "Stlproject" },
      { value: "sunraycollectibles", label: "Sunray Collectibles" },
      { value: "tsaber", label: "Tsaber" },
      { value: "u3dprintshop", label: "U3dprintshop" },
      { value: "uroboros3d", label: "Uroboros3D" },
      { value: "vengeancestudios", label: "VENGEANCESTUDIOS" },
      { value: "vxlabs", label: "VX-Labs" },
      { value: "yanh", label: "Yan H" },
      { value: "yukistudio", label: "Yuki Studio" },
      { value: "zahenstudio", label: "ZahenStudio" },
      { value: "zonanoko", label: "Zo Nanoko" },
      { value: "m", label: "産婦人科M" },
      { value: "jigglystix", label: "Jigglystix" },
      { value: "nutshellatelier", label: "Nutshell Atelier" },
      { value: "roninartsworkshop", label: "Ronin Arts Workshop" },
      { value: "torridaminis", label: "Torrida minis" },
      { value: "walades", label: "WALADES" },
      { value: "whitewerewolftavern", label: "White Werewolf Tavern" },
      { value: "yumekofigure", label: "YumekoFigure" },
      { value: "rnestudio", label: "RN Estudio" },
      { value: "texelion", label: "Texelion" },
      { value: "psminiatures", label: "PS miniatures" },
      { value: "nerikson", label: "Nerikson" },
      { value: "gazminis", label: "Gaz Minis" },
      { value: "3dartguy", label: "3DArtGuy" },
      { value: "artisanguild", label: "Artisan Guild" },
      { value: "alexeikonev", label: "Alexei Konev" },
      { value: "belksasar3dprint", label: "Belksasar3DPrint" },
      { value: "bitethebullet", label: "Bite the Bullet" },
      { value: "criptastudios", label: "Cripta Studios" },
      { value: "empirefigures", label: "EmpireFigures" },
      { value: "galaadminiatures", label: "Galaad Miniatures" },
      { value: "ghamak", label: "Ghamak" },
      { value: "greatgrimoire", label: "Great Grimoire" },
      { value: "infestedimagination", label: "INFESTEDIMAGINATION" },
      { value: "lootstudios", label: "Loot Studios" },
      { value: "manilovefigures", label: "Man I Love Figures" },
    ],
  },
]

 function ProductFiltersContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues=Array.from(searchParams.entries())
  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}{" "}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
                {searchParams.get(section.id) ? `(${searchParams.get(section.id)})`: ""}
              </span>
            </AccordionTrigger>
            <AccordionContent className="max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={`filter-${section.id}-${optionIdx}`}
                    checked={searchValues.some(([key, value]) =>key === section.id && value === option.value)}
                    onClick={(event)=>{
                      const params = new URLSearchParams(searchParams)
                      const checked = event.currentTarget.dataset.state === "checked" 
                      checked 
                      ? params.delete(section.id) 
                      : params.set(section.id, option.value)
                      router.replace(`/?${params.toString()}`)
                      }}
                    />

                    <label 
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
export function ProductFilters() {
  return (
    <Suspense fallback={LoadingSpinner()}>
      <ProductFiltersContent />
    </Suspense>
  );
}
