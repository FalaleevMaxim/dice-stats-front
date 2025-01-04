import CustomList from "./CustomList.jsx";

function DiceList({refreshKey, onSelectionChange, onDoubleClick}) {
    async function fetchDice() {
        const response = await fetch("http://localhost:8080/dice/all")
        return await response.json()
    }

    return <CustomList
        requestFunction={fetchDice}
        hasImage={true}
        searchPlaceholder="Поиск кубов..."
        refreshKey={refreshKey}
        onSelectionChange={onSelectionChange}
        onDoubleClick={onDoubleClick}
    />
}

export default DiceList