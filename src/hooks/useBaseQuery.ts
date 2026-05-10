import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Hook dùng chung cho việc lấy dữ liệu (Read)
export const useFetchData = <T>(key: any[], apiFn: () => Promise<T>, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: apiFn,
    ...options,
  });
};

// Hook dùng chung cho việc thay đổi dữ liệu (Create, Update, Delete)
export const useHandleMutation = <T>(
  apiFn: (data: any) => Promise<T>,
  invalidateKeys?: any[][] // Key để làm mới dữ liệu sau khi xong
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiFn,
    onSuccess: () => {
      if (invalidateKeys) {
        invalidateKeys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
      }
    },
  });
};

//Get Method
// const { data: students, isLoading } = useFetchData(
//   ['students'], 
//   () => studentService.getAll()
// );


// Add, Update, Delete
// const mutation = useHandleMutation(
//   (newClass) => classService.create(newClass),
//   [['classes']] // Tự động làm mới cache của 'classes' sau khi thêm thành công
// );

// const handleAdd = () => {
//   mutation.mutate({ name: 'Lớp 10A1', schoolId: 'S01' });
// };