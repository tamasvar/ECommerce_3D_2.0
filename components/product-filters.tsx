"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, ChangeEvent } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

const filters = [
  {
    id: "style",
    name: "Style",
    options: [
      { value: "SFW", label: "SFW" },
      { value: "NSFW", label: "NSFW" },
      { value: "Futa", label: "Futanari" },
    ],
  },
  {
    id: "universes",
    name: "Universe",
    options: [
      { value: "eldenring", label: "Elden Ring" },
      { value: "mastersoftheuniverse", label: "Masters of the Universe" },
    ],
  },
  {
    id: "arts",
    name: "Arts",
    options: [
      { value: "3dartguy", label: "3DArtGuy" },
      { value: "3dmoonn", label: "3DMoonn" },
      { value: "3dsqulpts", label: "3DSQULPTS" },
      { value: "3dwicked", label: "3DWicked" },
      { value: "abe3d", label: "Abe3D" },
      { value: "akashsingh", label: "Akash Singh" },
      { value: "aliance", label: "Aliance" },
      { value: "alexeikonev", label: "Alexei Konev" },
      { value: "arkevzstudios", label: "Arkevz Studios" },
      { value: "artifex3d", label: "Artifex3d" },
      { value: "artisanguild", label: "Artisan Guild" },
      { value: "aveen3d", label: "Aveen3d" },
      { value: "azerama", label: "AZERAMA" },
      { value: "b3dserk", label: "B3DSERK" },
      { value: "bahabbalam", label: "Bahab Balam" },
      { value: "barruzstudio", label: "BarruzStudio" },
      { value: "belksasar3dprint", label: "Belksasar3DPrint" },
      { value: "brunoart3dstl", label: "BrunoArt3DSTL " },
      { value: "brianmiroglio", label: "Brian Miroglio" },
      { value: "bulkamancer", label: "Bulkamancer" },
      { value: "ca3dart", label: "CA3DART" },
      { value: "carlospsilva", label: "Carlos-P-Silva" },
      { value: "cardoso3dstudio", label: "Cardoso3dstudio" },
      { value: "casculpts", label: "CA.Sculpts" },
      { value: "chagarin", label: "CHAGARIN" },
      { value: "chuyafactory", label: "Chuya Factory" },
      { value: "cgpyrodigitalart", label: "CG Pyro Digital Art" },
      { value: "cnjonvi", label: "CN Jonvi" },
      { value: "criptastudios", label: "Cripta Studios" },
      { value: "depaula", label: "De Paula" },
      { value: "digitaldark", label: "Digital Dark" },
      { value: "dinamuuu3d", label: "Dinamuuu3d" },
      { value: "esmonster", label: "E.S Monster" },
      { value: "exclusive3dprints", label: "Exclusive3dprints" },
      { value: "francisquez", label: "Francisquez" },
      { value: "galaadminiatures", label: "Galaad Miniatures" },
      { value: "gabrielmeyer", label: "Gabriel Meyer" },
      { value: "gazminis", label: "Gaz Minis" },
      { value: "generalbuta", label: "General Buta" },
      { value: "ghamak", label: "Ghamak" },
      { value: "gonzalouribe", label: "Gonzalo Uribe" },
      { value: "greatgrimoire", label: "Great Grimoire" },
      { value: "gsculptart", label: "Gsculpt Art" },
      { value: "h3ll", label: "H3LL" },
      { value: "hawo", label: "HAWO" },
      { value: "hybrisstudio", label: "Hybris Studio" },
      { value: "igorlopes", label: "Igor Lopes" },
      { value: "infestedimagination", label: "INFESTEDIMAGINATION" },
      { value: "inakisculpts", label: "Inaki Sculpts" },
      { value: "jigglystix", label: "Jigglystix" },
      { value: "johnken", label: "JohnKen" },
      { value: "kcstudio", label: "KcStudio" },
      { value: "kitsuneart", label: "KitsuneArt" },
      { value: "kutonsculpts", label: "KutonSculpts" },
      { value: "lacasette", label: "LacaSette" },
      { value: "lootstudios", label: "Loot Studios" },
      { value: "luftmenschstudio", label: "Luftmensch Studio" },
      { value: "manilovefigures", label: "Man I Love Figures" },
      { value: "marcoart", label: "Marco ART" },
      { value: "messias3dfigure", label: "Messias3DFigure" },
      { value: "michelballares", label: "Michel Ballares" },
      { value: "momoji3d", label: "Momoji3d" },
      { value: "mysticflare", label: "Mystic Flare" },
      { value: "nachocg", label: "NACHOCG" },
      { value: "nandosonny", label: "Nandosonny" },
      { value: "nationrodera3dstudios", label: "Nationrodera3DStudios" },
      { value: "nekofigurines", label: "Neko Figurines" },
      { value: "nerikson", label: "Nerikson" },
      { value: "nomnomfigures", label: "NomNom Figures" },
      { value: "nutshellatelier", label: "Nutshell Atelier" },
      { value: "officerrhu", label: "Officer-Rhu" },
      { value: "oxo3d", label: "OXO3D" },
      { value: "pearforceone", label: "PearForceOne" },
      { value: "pggasta", label: "Pggasta" },
      { value: "pinkstudio", label: "Pink Studio" },
      { value: "polybitsart", label: "PolyBitsArt" },
      { value: "poptotem", label: "POP Totem" },
      { value: "preystl", label: "Preystl" },
      { value: "psminiatures", label: "PS miniatures" },
      { value: "ritualcasting", label: "Ritual Casting" },
      { value: "rks3dcollectibles", label: "RKS3D Collectibles" },
      { value: "rnestudio", label: "RN Estudio" },
      { value: "romfx", label: "Romfx" },
      { value: "roninartsworkshop", label: "Ronin Arts Workshop" },
      { value: "rubim", label: "RUBIM" },
      { value: "rushzilla", label: "Rushzilla" },
      { value: "sanix", label: "Sanix" },
      { value: "shinjibom", label: "ShinjiBom" },
      { value: "sideshow", label: "SIDESHOW" },
      { value: "skyler3dstudios", label: "Skyler3DStudios" },
      { value: "stepanovsculpts", label: "Stepanovsculpts" },
      { value: "stlproject", label: "Stlproject" },
      { value: "sunraycollectibles", label: "Sunray Collectibles" },
      { value: "sunusumanart", label: "Sunusuman Art" },
      { value: "surelis3dart", label: "Surelis3D Art" },
      { value: "sweetpeadolls", label: "Sweet Pea Dolls" },
      { value: "syh3d", label: "Syh3D" },
      { value: "tafigurines", label: "Ta-figurines" },
      { value: "thatguywiththeface", label: "Thatguywiththeface" },
      { value: "thunderchrome", label: "Thunder Chrome" },
      { value: "toystudios", label: "ToyStudios" },
      { value: "txarles3d", label: "Txarles3d" },
      { value: "ukiyostl", label: "Ukiyo Stl" },
      { value: "valkanjoseph", label: "Valkan Joseph" },
      { value: "vengeancestudios", label: "VENGEANCESTUDIOS" },
      { value: "vxlabs", label: "VX-Labs" },
      { value: "walades", label: "WALADES" },
      { value: "whitewerewolftavern", label: "White Werewolf Tavern" },
      { value: "yanh", label: "Yan H" },
      { value: "yumekofigure", label: "YumekoFigure" },
      { value: "yukistudio", label: "Yuki Studio" },
      { value: "zahenstudio", label: "ZahenStudio" },
      { value: "zonanoko", label: "Zo Nanoko" },
      { value: "m", label: "産婦人科M" },
    ],
  },
]

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues = Array.from(searchParams.entries())

  // Define type for searchTerms
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({})

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>, sectionId: string) => {
    setSearchTerms({ ...searchTerms, [sectionId]: e.target.value })
  }

  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Universe</h3>

      {filters.map((section, i) => {
        const searchTerm = searchTerms[section.id] || ""
        const filteredOptions = section.options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return (
          <Accordion key={i} type="single" collapsible>
            <AccordionItem value={`item-${i}`}>
              <AccordionTrigger>
                <span>
                  {section.name}{" "}
                  <span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
                  {searchParams.get(section.id) ? `(${searchParams.get(section.id)})` : ""}
                </span>
              </AccordionTrigger>
              <AccordionContent className="max-h-[400px] overflow-y-auto">
                <input
                  type="text"
                  placeholder={`Search ${section.name}...`}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e, section.id)}
                  className="mb-4 w-full rounded border p-2"
                />
                <div className="space-y-4">
                  {filteredOptions.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`filter-${section.id}-${optionIdx}`}
                        checked={searchValues.some(([key, value]) => key === section.id && value === option.value)}
                        onClick={(event) => {
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
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </form>
  )
}
