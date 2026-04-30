## Goal
Expand the "What kind of place is it?" step on the waitlist form to better reflect the full range of African neighbourhood places people would nominate — so no one feels their corner spot doesn't belong.

## Change
In `src/components/landing/WaitlistModal.tsx`, expand the `PLACE_TYPES` array from 11 entries to a richer, neighbourhood-true list. "Other" stays at the end as the catch-all.

### New list (in order)
1. Barbershop
2. Salon / Hair
3. Spaza
4. Tuckshop
5. Shisanyama
6. Kota spot
7. Food spot
8. Café
9. Bakery
10. Butchery
11. Fruit & veg
12. Tavern / Pub
13. Car wash
14. Garage / Mechanic
15. Tyre fitment
16. Panelbeater
17. Hardware
18. Laundry / Dry cleaner
19. Tailor / Seamstress
20. Cobbler
21. Phone repair
22. Internet café
23. Stationery / Print shop
24. Pharmacy / Chemist
25. Clinic
26. Crèche / Daycare
27. Tutor / After-school
28. Gym
29. Church
30. Mosque
31. Community hall
32. Market stall
33. Bookshop
34. Florist
35. Pet shop / Vet
36. Studio (music / art)
37. Other

## Notes
- Chips already wrap responsively (`flex-wrap`), so a longer list renders fine on mobile and desktop.
- Single-select behaviour and validation logic untouched — only the array contents change.
- Naming uses neighbourhood vernacular ("Spaza", "Shisanyama", "Kota spot", "Chemist") alongside familiar terms so it reads as written by someone who lives here, not generated.

## Files
- `src/components/landing/WaitlistModal.tsx` — replace `PLACE_TYPES` array.