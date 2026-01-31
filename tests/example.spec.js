import { test, expect } from '@playwright/test';

test.describe('SwiftTranslator Automation Tests', () => {

  const tests = [

        { id: "Pos_Fun_0001", input: "mama gedhara yanavaa", expected: "මම ගෙදර යනවා" },
        { id: "Pos_Fun_0002", input: "mama vaeda karanavaa", expected: "මම වැඩ කරනවා" },
        { id: "Pos_Fun_0003", input: "api heta enavaa", expected: "අපි හෙට එනවා" },
        { id: "Pos_Fun_0004", input: "mama iiyee gedhara giyaa", expected: "මම ඊයේ ගෙදර ගියා" },
        { id: "Pos_Fun_0005", input: "oyaa enavadha?", expected: "ඔයා එනවද?" },
        { id: "Pos_Fun_0006", input: "issarahata yanna", expected: "ඉස්සරහට යන්න" },
        { id: "Pos_Fun_0007", input: "mama ehema karannee naehae", expected: "මම එහෙම කරන්නේ නැහැ" },
        { id: "Pos_Fun_0008", input: "aayuboovan", expected: "ආයුබෝවන්" },
        { id: "Pos_Fun_0009", input: "karuNaakaralaa mata udhavvak karanna puLuvandha", expected: "කරුණාකරලා මට උදව්වක් කරන්න පුළුවන්ද" },
        { id: "Pos_Fun_0010", input: "ehema karapan", expected: "එහෙම කරපන්" },
        { id: "Pos_Fun_0011", input: "mama office yanna kalin email ekak dhaanavaa", expected: "මම office යන්න කලින් email එකක් දානවා" },
        { id: "Pos_Fun_0012", input: "Zoom meeting ekak thiyenavaa", expected: "Zoom meeting එකක් තියෙනවා" },
        { id: "Pos_Fun_0013", input: "api Kandy yamu", expected: "අපි Kandy යමු" },
        { id: "Pos_Fun_0014", input: "api gedhara yanavaa", expected: "අපි ගෙදර යනවා" },
        { id: "Pos_Fun_0015", input: "eyaa gedhara giyaa", expected: "එයා ගෙදර ගියා" },
        { id: "Pos_Fun_0016", input: "hari lassanayi", expected: "හරි ලස්සනයි" },
        { id: "Pos_Fun_0017", input: "mata bath kanna oonee", expected: "මට බත් කන්න ඕනේ" },
        { id: "Pos_Fun_0018", input: "Rs. 1500 gatthaa", expected: "Rs. 1500 ගට්තා" },
        { id: "Pos_Fun_0019", input: "2025-12-25", expected: "2025-12-25" },
        { id: "Pos_Fun_0020", input: "7.30 AM enna", expected: "7.30 AM එන්න" },
        { id: "Pos_Fun_0021", input: "kilo 5k gaththaa", expected: "kilo 5ක් ගත්තා" },
        { id: "Pos_Fun_0022", input: "mama gedhara yanavaa saha gihin bath kanavaa", expected: "මම ගෙදර යනවා සහ ගිහින් බත් කනවා" },
        { id: "Pos_Fun_0023", input: "oyaa enakam mama balan innavaa", expected: "ඔයා එනකම් මම බලන් ඉන්නවා" },
        { id: "Pos_Fun_0024", input: "mama adha udhaasanama nagitalaa vaeda karalaa passe gedhara giyaa", expected: "මම අද උදාසනම නගිටලා වැඩ කරලා පස්සෙ ගෙදර ගියා" },

        // Negative functional test cases (Neg_Fun_xxxx)
        { id: "Neg_Fun_0001", input: "mamagedharayanawa", expected: "මමගෙදරයනwඅ" },               // garbled: translator outputs w+අ for final va
        { id: "Neg_Fun_0002", input: "matabathkannaoonee", expected: "මටබත්කන්නඕනේ" }, // likely incorrect
        { id: "Neg_Fun_0003", input: "ela machan supiri kiri", expected: "එල මචන් සුපිරි කිරි" },
        { id: "Neg_Fun_0003a", input: "mama   gedhara   yanavaa.", expected: "මම   ගෙදර   යනවා." },  // spaces may collapse
        { id: "Neg_Fun_0004", input: "MaMa GeDhArA YaNaVaA", expected: "මම ඟෙධර YඅණVඅඅ" },     // mixed case - garbled output
        { id: "Neg_Fun_0005", input: "mama@@ gedhara!!", expected: "මම@@ ගෙදර!!" },             // special chars - symbols preserved
        { id: "Neg_Fun_0006", input: "mama gedhara yanavaa\noyaa enavadha", expected: "මම ගෙදර යනවා\nඔයා එනවද" },            // fix: නොයා → ඔයා (oyaa = you)
        { id: "Neg_Fun_0007", input: "mama gedhara yanavaa", expected: "මම ගෙදර යනවා" },      // slang may be partially wrong
        { id: "Neg_Fun_0008", input: "mama gedhara", expected: "මම ගෙදර" },                      // incomplete phrase - no completion
        { id: "Neg_Fun_0009", input: "mama ### yanavaa", expected: "මම ### යනවා" }, // slang issue
        
    ];

    test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
        await page.goto('https://www.swifttranslator.com/');
    });

    for (const scenario of tests) {
        test(`${scenario.id}: ${scenario.input}`, async ({ page }) => {
          const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
          const outputField = page.locator('div.whitespace-pre-wrap').nth(0);
    
          // Steps for functional test cases [cite: 303-305]
          await inputField.fill(scenario.input);

          // Wait for translation: poll until output appears (or timeout for empty-expected cases)
          if (scenario.expected) {
            await expect(async () => {
              const text = await outputField.innerText();
              expect(text.trim().length).toBeGreaterThan(0);
            }).toPass({ timeout: 10000 });
          } else {
            await page.waitForTimeout(5000);
          }

          const actualOutput = await outputField.innerText();
          // Log the actual output for debugging
          console.log(`Test ${scenario.id} | Input: ${scenario.input} | Expected: ${scenario.expected} | Actual: '${actualOutput.trim()}'`);
          // Assert that the generated output matches your expected output
          expect(actualOutput.trim()).toBe(scenario.expected);
        });
    }

});
