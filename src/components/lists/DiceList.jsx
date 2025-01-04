import CustomList from "./CustomList.jsx";

function DiceList({refreshKey, onSelectionChange}) {
    async function fetchDice() {
        const response = await fetch("http://localhost:8080/dice/all")
        return await response.json()
    }

    return <CustomList
        requestFunction={fetchDice}
        hasImage={true}
        refreshKey={refreshKey}
        onSelectionChange={onSelectionChange}
        searchPlaceholder="Поиск кубов..."
    />
}

export default DiceList