import React from 'react';
import {AvgMark, AvgMarks as AvgMarksType} from "../../../modules/scoleAPI/types/AvgMarks";
import {Grid} from "@mui/material";

interface AvgMarksProps {
    avgMarks: AvgMarksType
}

const AvgMarks: React.FC<AvgMarksProps> = ({ avgMarks }) => {
    return (
        <Grid p={'4px'} bgcolor={'rgb(35, 35, 35)'} borderRadius={'8px'}>
            <Grid fontSize={'22px'} fontWeight={'bold'} mb={1} pl={1}>
                Средние баллы
            </Grid>
            <Grid display={'flex'}>
                {Object.values(avgMarks).map((avgMark: AvgMark) => (
                    <Grid ml={'2px'} mr={'2px'} flex={1} display={'flex'} flexDirection={'column'} borderRadius={'4px'} bgcolor={'rgb(25, 25, 25)'}>
                        <Grid textAlign={'center'} fontWeight={'bolder'} color={'darkgray'}>
                            {avgMark?.timing.name}
                        </Grid>
                        <Grid textAlign={'center'} fontWeight={'bolder'}>
                            {avgMark?.mark}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default AvgMarks;