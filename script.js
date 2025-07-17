// ==== Tab Switching ====
const tabs = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tabBtn) => {
  tabBtn.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tabBtn.classList.add("active");

    const target = tabBtn.getAttribute("data-tab");
    tabContents.forEach((content) => {
      if (content.id === target) {
        content.classList.add("active");
        content.removeAttribute("hidden");
      } else {
        content.classList.remove("active");
        content.setAttribute("hidden", "");
      }
    });
  });
});



// ==== Drop down Menu ====

function populateYearDropdown(id, startYear, endYear) {
  const select = document.getElementById(id);
  for (let year = endYear; year >= startYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
}

// Call the function for SSC and HSC year dropdowns
populateYearDropdown('sscYear', 2015, 2025);
populateYearDropdown('hscYear', 2015, 2025);




// ==== Drop down Menu ====

function populateYearDropdown(id, startYear, endYear) {
  const select = document.getElementById(id);
  for (let year = endYear; year >= startYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
}

// Call the function for Admin dropdowns
populateYearDropdown('adminsscYearMin', 2015, 2025);
populateYearDropdown('adminsscYearMax', 2015, 2025);
populateYearDropdown('adminhscYearMin', 2015, 2025);
populateYearDropdown('adminhscYearMax', 2015, 2025);

 



// ==== University Data Management ====

let universities = [];

function saveToLocalStorage() {
  localStorage.setItem("universities", JSON.stringify(universities));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("universities");
  if (data) {
    universities = JSON.parse(data);
  } else {
    universities = [];
  }
}

const universityForm = document.getElementById("universityForm");
const universityTableBody = document.getElementById("universityTableBody");
const adminSearchInput = document.getElementById("adminSearchInput");

// Add University
universityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const uni = {
    id: Date.now(),
    name: universityForm.name.value.trim(),
    ssc: parseFloat(universityForm.ssc.value),
    sscMinYear: parseInt(universityForm.sscMinYear.value),
    sscMaxYear: parseInt(universityForm.sscMaxYear.value),
    hsc: parseFloat(universityForm.hsc.value),
    hscMinYear: parseInt(universityForm.hscMinYear.value),
    hscMaxYear: parseInt(universityForm.hscMaxYear.value),
    minMarks: {
      bangla: parseInt(universityForm.minBangla.value),
      english: parseInt(universityForm.minEnglish.value),
      ict: parseInt(universityForm.minIct.value),
      physics: parseInt(universityForm.minPhysics.value),
      chemistry: parseInt(universityForm.minChemistry.value),
      math: parseInt(universityForm.minMath.value),
      biology: parseInt(universityForm.minBiology.value),
    },
    website: universityForm.website.value.trim(),
    location: universityForm.location.value.trim(),
    logo: universityForm.logo.value.trim(),
  };

  universities.push(uni);
  saveToLocalStorage();
  renderTable();
  universityForm.reset();
});

function renderTable(filteredList) {
  universityTableBody.innerHTML = "";

  const list = filteredList || universities;

  if (list.length === 0) {
    universityTableBody.innerHTML = `<tr><td colspan="8">No universities found.</td></tr>`;
    return;
  }

  list.forEach((uni) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = uni.name;
    tr.appendChild(tdName);

    const tdLogo = document.createElement("td");
    if (uni.logo) {
      const img = document.createElement("img");
      img.src = uni.logo;
      img.alt = uni.name + " logo";
      tdLogo.appendChild(img);
    } else {
      tdLogo.textContent = "-";
    }
    tr.appendChild(tdLogo);

    const tdLoc = document.createElement("td");
    tdLoc.textContent = uni.location || "-";
    tr.appendChild(tdLoc);

    const tdSSC = document.createElement("td");
    tdSSC.textContent = `${uni.ssc} (${uni.sscMinYear} - ${uni.sscMaxYear})`;
    tr.appendChild(tdSSC);

    const tdHSC = document.createElement("td");
    tdHSC.textContent = `${uni.hsc} (${uni.hscMinYear} - ${uni.hscMaxYear})`;
    tr.appendChild(tdHSC);

    const tdMarks = document.createElement("td");
    tdMarks.textContent = Object.entries(uni.minMarks)
      .map(([sub, mark]) => `${capitalize(sub)}: ${mark}`)
      .join(", ");
    tr.appendChild(tdMarks);

    const tdWeb = document.createElement("td");
    if (uni.website) {
      const a = document.createElement("a");
      a.href = uni.website;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Visit";
      tdWeb.appendChild(a);
    } else {
      tdWeb.textContent = "-";
    }
    tr.appendChild(tdWeb);

    const tdActions = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.backgroundColor = "#d32f2f";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.padding = "5px 10px";
    delBtn.style.borderRadius = "5px";
    delBtn.style.cursor = "pointer";

    delBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete "${uni.name}"?`)) {
        universities = universities.filter((u) => u.id !== uni.id);
        saveToLocalStorage();
        renderTable();
      }
    });

    tdActions.appendChild(delBtn);
    tr.appendChild(tdActions);

    universityTableBody.appendChild(tr);
  });
}

function capitalize(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

// Admin Search
adminSearchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    renderTable();
    return;
  }
  const filtered = universities.filter((uni) =>
    uni.name.toLowerCase().includes(query) ||
    (uni.location && uni.location.toLowerCase().includes(query))
  );
  renderTable(filtered);
});

// ==== Student Panel Logic ====
// (same as before — studentForm submission, result rendering, etc.)

// ==== CSV Export ====
// (same as before — CSV export logic)

loadFromLocalStorage();
renderTable();
