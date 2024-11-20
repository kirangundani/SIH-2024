// const socket = io();
// let currentUser = null;
// let map, userMarker;

// // Coordinates for Siddaganga Institute of Technology, Tumkur
// const SIT_COORDINATES = [13.3268979, 77.1235199];

// function getRandomCoordinates(centerLat, centerLon, radius) {
//     const randomAngle = Math.random() * 2 * Math.PI; // Random angle
//     const randomRadius = Math.sqrt(Math.random()) * radius; // Random radius in km, square root ensures uniform distribution

//     const earthRadius = 6371; // Earth radius in km

//     const offsetLat = randomRadius * Math.cos(randomAngle) / earthRadius * (180 / Math.PI);
//     const offsetLon = randomRadius * Math.sin(randomAngle) / (earthRadius * Math.cos(centerLat * Math.PI / 180)) * (180 / Math.PI);

//     return {
//         latitude: centerLat + offsetLat,
//         longitude: centerLon + offsetLon
//     };
// }

// // Dummy labour data around Siddaganga Institute of Technology
// const dummyLabours = [
//     { 
//         name: 'Ravi Kumar', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 2.1,
//         skills: 'Crop Harvesting'
//     },
//     { 
//         name: 'Prakash Singh', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 3.5,
//         skills: 'Planting'
//     },
//     { 
//         name: 'Rahul Sharma', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 4.2,
//         skills: 'Irrigation'
//     },
//     { 
//         name: 'Mohan Das', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 1.9,
//         skills: 'Weeding'
//     },
//     { 
//         name: 'Arjun Mehta', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 0.8,
//         skills: 'Soil Preparation'
//     },
//     { 
//         name: 'Vikas Yadav', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 2.6,
//         skills: 'Harvest Transport'
//     },
//     { 
//         name: 'Karan Singh', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 4.8,
//         skills: 'Crop Protection'
//     },
//     { 
//         name: 'Ramesh Kumar', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 3.7,
//         skills: 'Water Management'
//     },
//     { 
//         name: 'Suresh Gupta', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 1.5,
//         skills: 'Fertilizer Application'
//     },
//     { 
//         name: 'Pawan Sharma', 
//         userType: 'labour', 
//         ...getRandomCoordinates(13.3268979, 77.1235199, 5),
//         distance: 0.9,
//         skills: 'Land Leveling'
//     },
//     // ... (rest of the dummy labour data remains the same)
// ];

// // Initialize map centered on SIT
// map = L.map("map").setView(SIT_COORDINATES, 15);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "OpenStreetMap",
// }).addTo(map);

// // Add a marker for Siddaganga Institute of Technology
// L.marker(SIT_COORDINATES)
//     .addTo(map)
//     .bindPopup("Siddaganga Institute of Technology")
//     .openPopup();

// // Handle form submission
// document.getElementById('userForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const name = document.getElementById('name').value;
//     const userType = document.getElementById('userType').value;
//     const requiredLabours = document.getElementById('requiredLabours').value;

//     // Hide registration overlay
//     document.getElementById('registrationForm').style.display = 'none';

//     // Simulate nearby users for demonstration
//     const nearbyUsersDiv = document.getElementById('nearbyUsers');
//     nearbyUsersDiv.innerHTML = '';
    
//     dummyLabours.forEach(user => {
//         // Create marker for each labour
//         L.marker([user.latitude, user.longitude])
//             .addTo(map)
//             .bindPopup(`
//                 <strong>${user.name}</strong><br>
//                 Labour<br>
//                 Skills: ${user.skills}<br>
//                 Distance: ${user.distance.toFixed(2)} km
//             `);

//         const userDiv = document.createElement('div');
//         userDiv.className = 'nearby-user';
//         userDiv.innerHTML = `
//             <strong>${user.name}</strong><br>
//             Labour<br>
//             Skills: ${user.skills}<br>
//             Distance: ${user.distance.toFixed(2)} km
//             <button onclick="contactLabour('${user.name}')">Contact</button>
//         `;
//         nearbyUsersDiv.appendChild(userDiv);
//     });
// });

// // Function to simulate labour contact
// function contactLabour(labourName) {
//     alert(`Contacting ${labourName}. In a real app, this would initiate communication.`);
// }

// // Show/hide labour requirement field based on user type
// document.getElementById('userType').addEventListener('change', (e) => {
//     const labourRequirementDiv = document.getElementById('labourRequirementDiv');
//     labourRequirementDiv.style.display = e.target.value === 'farmer' ? 'block' : 'none';
// });


const socket = io();
let currentUser = null;
let map, userMarker;

// Coordinates for Siddaganga Institute of Technology, Tumkur
const SIT_COORDINATES = [13.3268979, 77.1235199];

function getRandomCoordinates(centerLat, centerLon, radius) {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.sqrt(Math.random()) * radius;

    const earthRadius = 6371; // Earth radius in km

    const offsetLat = randomRadius * Math.cos(randomAngle) / earthRadius * (180 / Math.PI);
    const offsetLon = randomRadius * Math.sin(randomAngle) / (earthRadius * Math.cos(centerLat * Math.PI / 180)) * (180 / Math.PI);

    return {
        latitude: centerLat + offsetLat,
        longitude: centerLon + offsetLon
    };
}

function generateDynamicLabours(userLat, userLon, count = 10) {
    return Array.from({length: count}, (_, index) => {
        const location = getRandomCoordinates(userLat, userLon, 5);
        return { 
            name: `Labour ${index + 1}`, 
            userType: 'labour', 
            ...location,
            distance: Math.sqrt(
                Math.pow(location.latitude - userLat, 2) + 
                Math.pow(location.longitude - userLon, 2)
            ) * 111, // Approximate km conversion
            skills: ['Crop Harvesting', 'Planting', 'Irrigation', 'Weeding', 'Soil Preparation'][index % 5]
        };
    });
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const userType = document.getElementById('userType').value;
    const requiredLabours = document.getElementById('requiredLabours').value;

    // Hide registration overlay
    document.getElementById('registrationForm').style.display = 'none';

    // User's location marker in red
    const userLocation = getRandomCoordinates(SIT_COORDINATES[0], SIT_COORDINATES[1], 2);
    userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: L.divIcon({
            className: 'user-marker',
            html: `<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>`,
            iconSize: [20, 20]
        })
    }).addTo(map).bindPopup(`<strong>${name}</strong><br>${userType}`);

    // Dynamically generate nearby labour markers
    const nearbyLabours = generateDynamicLabours(userLocation.latitude, userLocation.longitude);
    
    // Clear previous markers and user list
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });
    
    const nearbyUsersDiv = document.getElementById('nearbyUsers');
    nearbyUsersDiv.innerHTML = '';
    
    nearbyLabours.forEach(user => {
        // Labour markers in green
        const labourMarker = L.marker([user.latitude, user.longitude], {
            icon: L.divIcon({
                className: 'labour-marker',
                html: `<div style="background-color: green; width: 15px; height: 15px; border-radius: 50%;"></div>`,
                iconSize: [15, 15]
            })
        }).addTo(map).bindPopup(`
            <strong>${user.name}</strong><br>
            Labour<br>
            Skills: ${user.skills}<br>
            Distance: ${user.distance.toFixed(2)} km
        `);

        const userDiv = document.createElement('div');
        userDiv.className = 'nearby-user';
        userDiv.innerHTML = `
            <strong>${user.name}</strong><br>
            Labour<br>
            Skills: ${user.skills}<br>
            Distance: ${user.distance.toFixed(2)} km
            <button onclick="contactLabour('${user.name}')">Contact</button>
        `;
        nearbyUsersDiv.appendChild(userDiv);
    });

    // Center map on user location
    map.setView([userLocation.latitude, userLocation.longitude], 12);
});

// Existing contactLabour and other functions remain the same